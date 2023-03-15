import { Address, OpenedContract, Sender, toNano } from "ton";
import { ContractSystem, Logger, Tracker, Treasure } from "ton-emulator";
import { PositionsManagerContract } from "./output/stableton_PositionsManagerContract";
import { StablecoinMasterContract } from "./output/stableton_StablecoinMasterContract";
import { UserPositionContract } from "./output/stableton_UserPositionContract";
import { StablecoinJettonContract } from "./output/stableton_StablecoinJettonContract";

describe("StablecoinMasterContract", () => {
    let system: ContractSystem;
    let owner: Treasure;
    let user: Treasure;
    let userPosition: Treasure;
    let positionsManager: Treasure;
    let gateKeeper: Treasure;
    let jetton: Treasure;
    let stablecoinMasterContract: OpenedContract<StablecoinMasterContract>;
    let track: Tracker;
    let logger: Logger;

    beforeAll(async () => {
        system = await ContractSystem.create();
        owner = system.treasure("owner");
        user = system.treasure("user");
        gateKeeper = system.treasure("gateKeeper");
        positionsManager = system.treasure("positionsManager");
        userPosition = system.treasure("userPosition");
        jetton = system.treasure("jetton");

        stablecoinMasterContract = system.open(await StablecoinMasterContract.fromInit());

        track = system.track(stablecoinMasterContract.address);
        logger = system.log(stablecoinMasterContract.address);
    });

    it("should deploy correctly and set init state", async () => {
        await stablecoinMasterContract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        console.log("stablecoinMasterContract", stablecoinMasterContract.address);

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const masterData = await stablecoinMasterContract.getGetJettonData();
        expect(masterData.owner.toString()).toEqual(owner.address.toString());
    });

    it("on mintMessage should increase totalsupply and transfer amount", async () => {
        await stablecoinMasterContract.send(
            userPosition,
            { value: toNano(1) },
            { $$type: "MintMessage", user: user.address, amount: 100n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        expect(await stablecoinMasterContract.getTotalSupply()).toEqual(100n);
    });

    it("on repayBurn should send burn message to jetton", async () => {
        await stablecoinMasterContract.send(
            userPosition,
            { value: toNano(1) },
            { $$type: "RepayBurnMessage", user: user.address, amount: 100n, fees: 10n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("on repayBurnNotification should send stablecoinBurned to user position", async () => {
        await stablecoinMasterContract.send(
            jetton,
            { value: toNano(1) },
            { $$type: "RepayBurnNotification", user: user.address, amount: 100n, fees: 10n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("on MintFeesMessage should increase amount and send internaltransfer to jetton", async () => {
        await stablecoinMasterContract.send(
            gateKeeper,
            { value: toNano(1) },
            { $$type: "MintFeesMessage", to: user.address, amount: 100n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        expect(await stablecoinMasterContract.getTotalSupply()).toEqual(100n);
    });
});

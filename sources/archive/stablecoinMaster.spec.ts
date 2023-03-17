import { Address, OpenedContract, Sender, toNano } from "ton";
import { ContractSystem, Logger, Tracker, Treasure } from "ton-emulator";
import { PositionsManagerContract } from "./output/stableton_PositionsManagerContract";
import { StablecoinMasterContract } from "./output/stableton_StablecoinMasterContract";
import { UserPositionContract } from "./output/stableton_UserPositionContract";
import { StablecoinJettonContract } from "./output/stableton_StablecoinJettonContract";
import { buildOnchainMetadata } from "./utils/jetton-helpers";

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

        const jettonParams = {
            name: "STABLE",
            symbol: "STB",
            description: "Dorahack stableton",
            image: "https://ipfs.io/ipfs/QmbPZjC1tuP6ickCCBtoTCQ9gc3RpkbKx7C1LMYQdcLwti", // Image url
        };

        let content = buildOnchainMetadata(jettonParams);

        stablecoinMasterContract = system.open(await StablecoinMasterContract.fromInit(content));

        track = system.track(stablecoinMasterContract.address);
        logger = system.log(stablecoinMasterContract.address);
    });

    it("should deploy correctly, set init state and premint amount to owner wallet", async () => {
        const premintValue = toNano("1000");

        await stablecoinMasterContract.send(owner, { value: toNano(1) }, { $$type: "Mint", amount: premintValue });
        console.log("stablecoinMasterContract", stablecoinMasterContract.address);

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        //check master data and total supply
        const masterData = await stablecoinMasterContract.getGetJettonData();
        expect(masterData.owner.toString()).toEqual(owner.address.toString());
        // console.log("total supply", masterData.totalSupply);
        expect(masterData.totalSupply).toEqual(premintValue);

        // check getWalletAddress by owner address works
        const ownerRealJettonAddress = await stablecoinMasterContract.getGetWalletAddress(owner.address);
        // console.log({ ownerRealJettonAddress: ownerRealJettonAddress.toString() });

        const ownerCalculatedJettonContract = system.open(
            await StablecoinJettonContract.fromInit(stablecoinMasterContract.address, owner.address)
        );

        // console.log({ ownerCalculatedJettonAddress: ownerCalculatedJettonContract.address.toString() });

        expect(ownerRealJettonAddress.toString()).toEqual(ownerCalculatedJettonContract.address.toString());

        // check owner wallet balance has premint

        const ownerBalance = await ownerCalculatedJettonContract.getGetBalance();
        // console.log({ ownerBalance });

        expect(ownerBalance).toEqual(premintValue);
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
            {
                $$type: "RepayBurnMessage",
                user: user.address,
                amount: 100n,
                rate: {
                    $$type: "DebtRate",
                    debtAccumulatedRate: 1n,
                    lastAccumulationTime: 1n,
                },
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("on repayBurnNotification should send stablecoinBurned to user position", async () => {
        await stablecoinMasterContract.send(
            jetton,
            { value: toNano(1) },
            {
                $$type: "RepayBurnNotification",
                user: user.address,
                amount: 100n,
                rate: {
                    $$type: "DebtRate",
                    debtAccumulatedRate: 1n,
                    lastAccumulationTime: 1n,
                },
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("on MintFeesMessage should increase amount and send internaltransfer to jetton", async () => {
        await stablecoinMasterContract.send(gateKeeper, { value: toNano(1) }, { $$type: "Mint", amount: 100n });

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        expect(await stablecoinMasterContract.getTotalSupply()).toEqual(100n);
    });
});

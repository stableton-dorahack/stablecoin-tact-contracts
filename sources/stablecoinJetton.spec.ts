import { StablecoinJettonContract } from "./output/stableton_StablecoinJettonContract";
import { Address, beginCell, OpenedContract, Sender, toNano } from "ton";
import { ContractSystem, Logger, Tracker, Treasure } from "ton-emulator";

describe("StablecoinJettonContract", () => {
    let system: ContractSystem;
    let owner: Treasure;
    let user: Treasure;
    let userPosition: Treasure;
    let positionsManager: Treasure;
    let gateKeeper: Treasure;
    let jetton: Treasure;
    let stablecoinMaster: Treasure;
    let stablecoinJettonContract: OpenedContract<StablecoinJettonContract>;
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
        stablecoinMaster = system.treasure("stablecoinMaster");

        stablecoinJettonContract = system.open(
            await StablecoinJettonContract.fromInit(stablecoinMaster.address, user.address)
        );

        track = system.track(stablecoinJettonContract.address);
        logger = system.log(stablecoinJettonContract.address);
    });

    it("on repayBurned message should fail if amount repayed more than balance", async () => {
        await stablecoinJettonContract.send(
            stablecoinMaster,
            { value: toNano(1) },
            { $$type: "RepayBurnMessage", user: user.address, amount: 100n, fees: 1n }
        );
        console.log("stablecoinJettonContract", stablecoinJettonContract.address);

        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("on repayBurned message should decrease balance and send repayBurnNotification to master", async () => {
        // increase balance before
        await stablecoinJettonContract.send(
            stablecoinMaster,
            { value: toNano(10) },
            {
                $$type: "TokenTransferInternal",
                queryId: 10n,
                amount: 1000n,
                from: user.address,
                responseAddress: null,
                forwardTonAmount: 0n,
                forwardPayload: beginCell().endCell(),
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const walletData = await stablecoinJettonContract.getGetWalletData();
        const balance = walletData.balance;
        expect(balance).toEqual(1000n);

        await stablecoinJettonContract.send(
            stablecoinMaster,
            { value: toNano(1) },
            { $$type: "RepayBurnMessage", user: user.address, amount: 100n, fees: 1n }
        );

        await system.run();

        expect(track.collect()).toMatchSnapshot();

        const walletDataAfter = await stablecoinJettonContract.getGetWalletData();
        const balanceAfter = walletDataAfter.balance;
        expect(balanceAfter).toEqual(900n);
    });
});

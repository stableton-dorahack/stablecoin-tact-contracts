import { on } from "events";
import { OpenedContract, toNano } from "ton";
import { ContractSystem, Logger, Tracker, Treasure } from "ton-emulator";
import { GateKeeperContract } from "./output/stableton_GateKeeperContract";

const sleep = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

describe("GateKeeperContract", () => {
    let system: ContractSystem;
    let owner: Treasure;
    let user: Treasure;
    let positionsManager: Treasure;
    let stablecoinMaster: Treasure;
    let gateKeeperContract: OpenedContract<GateKeeperContract>;
    let track: Tracker;
    let logger: Logger;

    beforeAll(async () => {
        system = await ContractSystem.create();
        owner = system.treasure("owner");
        user = system.treasure("user");
        positionsManager = system.treasure("positionsManager");
        stablecoinMaster = system.treasure("stablecoinMaster");

        gateKeeperContract = system.open(await GateKeeperContract.fromInit());

        track = system.track(gateKeeperContract.address);
        logger = system.log(gateKeeperContract.address);
    });

    it("should deploy correctly", async () => {
        await gateKeeperContract.send(
            owner,
            { value: toNano(1) },
            {
                $$type: "SetDeps",
                stablecoinMasterAddress: stablecoinMaster.address,
                positionsManagerAddress: positionsManager.address,
            }
        );
        await system.run();

        expect(track.collect()).toMatchSnapshot();

        expect(await gateKeeperContract.getPoolSettings()).toEqual({
            $$type: "PoolSettings",
            liquidationRatio: 0n,
            liquidatorIncentiveBps: 0n,
            stabilityFeeRate: 0n,
        });

        const deps = await gateKeeperContract.getGetDeps();

        expect(deps.positionsManagerAddress.toString()).toEqual("EQCmw0-Nvnap6F8s-77yXEYbduFtd_bSsmDZu6eYT4Oy-LEr");
        expect(deps.stablecoinMasterAddress.toString()).toEqual("EQCDr0Gm-nivCD9KWPb6JkiDulGZ8eNb2Xm_HNi39oyNbKeD");
    });

    it("on pool settings msg should store new settings ", async () => {
        // Set pool settings by owner

        const now = Math.round(new Date().getTime() / 1000);
        await gateKeeperContract.send(
            owner,
            { value: toNano(1) },
            {
                $$type: "PoolSettingsMsg",
                liquidationRatio: 1200000000n,
                stabilityFeeRate: 1000000000625n,
                liquidatorIncentiveBps: 10500n,
            }
        );
        await system.run();

        expect(track.collect()).toMatchSnapshot();

        expect(await gateKeeperContract.getPoolSettings()).toEqual({
            $$type: "PoolSettings",
            liquidationRatio: 1200000000n,
            stabilityFeeRate: 1000000000625n,
            liquidatorIncentiveBps: 10500n,
        });
    });

    it("should set ton price", async () => {
        console.log("contract.getTonPrice()", await gateKeeperContract.getTonPrice());

        expect(await gateKeeperContract.getTonPrice()).toEqual(0n);
        expect(await gateKeeperContract.getTonPriceWithSafetyMargin()).toEqual(0n);

        // Set pool settings by owner
        await gateKeeperContract.send(
            owner,
            { value: toNano(1) },
            {
                $$type: "UpdateTonPriceMsg",
                price: 3200000000n,
            }
        );
        await system.run();
        expect(track.collect()).toMatchSnapshot();

        // Check updated ton price
        console.log("contract.getTonPrice()", await gateKeeperContract.getTonPrice());
        expect(await gateKeeperContract.getTonPrice()).toEqual(3200000000n);

        // liquidation ratio = 120%, means if collateral volume is less than debt*1.2 then liquidation possible
        console.log("tonPriceWithSafetyMargin", await gateKeeperContract.getTonPriceWithSafetyMargin());
        expect(await gateKeeperContract.getTonPriceWithSafetyMargin()).toEqual(2666666666n);
    });

    it("on deposit collateral should forward message to positionsManager and have msg.amount left on gatekeeper balance", async () => {
        console.log("gateKeeper balance before", await gateKeeperContract.getGetBalance());

        // send collateral 100 ton plus 1 ton for messaging
        await gateKeeperContract.send(
            user,
            { value: toNano(101) },
            {
                $$type: "DepositCollateralUserMessage",
                user: user.address,
                amount: toNano(100),
            }
        );
        await system.run();
        expect(track.collect()).toMatchSnapshot();

        // gatekeeper should store 100 ton collateral
        console.log("gateKeeper balance after", await gateKeeperContract.getGetBalance());
        expect(await gateKeeperContract.getGetBalance()).toBeGreaterThan(toNano(100));

        // console.warn(logger.collect());
    });

    it("on withdrawstablecoins should forward message to positionsManager with current settings and price", async () => {
        await gateKeeperContract.send(
            user,
            { value: toNano(1) },
            {
                $$type: "WithdrawStablecoinUserMessage",
                user: user.address,
                amount: toNano(100),
            }
        );
        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("on increase total stable should add total stables count", async () => {
        const totalStablesIssuedBefore = await gateKeeperContract.getStablecoinsIssued();
        await gateKeeperContract.send(
            positionsManager,
            { value: toNano(1) },
            {
                $$type: "IncreaseTotalStableMessage",
                user: user.address,
                amount: toNano(100),
            }
        );
        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const totalStablesIssuedAfter = await gateKeeperContract.getStablecoinsIssued();
        expect(totalStablesIssuedAfter - totalStablesIssuedBefore).toEqual(toNano(100));
    });

    it("on repayStablecoinUserMessage should send enhanced message to positionsAddressManager", async () => {
        await gateKeeperContract.send(
            user,
            { value: toNano(1) },
            {
                $$type: "RepayStablecoinUserMessage",
                user: user.address,
                amount: toNano(100),
            }
        );
        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("collectFees increases debtRate", async () => {
        const debtRate = await gateKeeperContract.getDebtRate();
        console.log({ debtRate });
        console.log(system.now);

        await gateKeeperContract.send(owner, { value: toNano(1) }, "CollectFees");
        system.run();
        expect(track.collect()).toMatchSnapshot();
        console.warn(logger.collect());

        const debtRateAfter = await gateKeeperContract.getDebtRate();
        console.log({ debtRateAfter });
    });

    // todo test for WithdrawFeesMessage
});

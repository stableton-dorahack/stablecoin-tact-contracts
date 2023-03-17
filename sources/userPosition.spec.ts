import { Address, OpenedContract, Sender, toNano } from "ton";
import { ContractSystem, Logger, Tracker, Treasure } from "ton-emulator";
import { UserPositionContract } from "./output/stableton_UserPositionContract";

describe("PositionsManagerContract", () => {
    let system: ContractSystem;
    let owner: Treasure;
    let user: Treasure;
    let gateKeeper: Treasure;
    let stablecoinMaster: Treasure;
    let positionsManager: Treasure;
    let userPositionContract: OpenedContract<UserPositionContract>;
    let track: Tracker;
    let logger: Logger;

    beforeAll(async () => {
        system = await ContractSystem.create();
        owner = system.treasure("owner");
        user = system.treasure("user");
        gateKeeper = system.treasure("gateKeeper");
        stablecoinMaster = system.treasure("stablecoinMaster");
        positionsManager = system.treasure("positionsManager");

        userPositionContract = system.open(
            await UserPositionContract.fromInit(user.address, stablecoinMaster.address, positionsManager.address)
        );

        track = system.track(userPositionContract.address);
        logger = system.log(userPositionContract.address);
    });

    it("should deploy correctly and send newPositionId request to positionsManager", async () => {
        await userPositionContract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        console.log("positionsManager", positionsManager.address);

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        expect(await userPositionContract.getGetMessage()).toEqual("Position created");
    });

    // todo add actions to init healthy position
    it("on addCollateral from positionsManager", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            {
                $$type: "DepositCollateralMessage",
                user: user.address,
                amount: toNano(100),
                settings: {
                    $$type: "PoolSettings",
                    liquidationRatio: 1n,
                    stabilityFeeRate: 1n,
                    liquidatorIncentiveBps: 1n,
                },
                rate: {
                    $$type: "DebtRate",
                    debtAccumulatedRate: 1n,
                    lastAccumulationTime: 1n,
                },
                tonPriceWithSafetyMargin: 2600000000n,
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const postitionState = await userPositionContract.getGetPositionState();
        console.log({ postitionState });

        expect(postitionState).toEqual({ $$type: "PositionState", collateral: toNano(100), debt: 0n });
        expect(await userPositionContract.getGetMessage()).toEqual("Collateral added");
    });

    it("on withdrawStablecoin from positionsManager with unhealthy position", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            {
                $$type: "WithdrawStablecoinMessage",
                user: user.address,
                amount: toNano(1000),
                settings: {
                    $$type: "PoolSettings",
                    liquidationRatio: 1n,
                    stabilityFeeRate: 1n,
                    liquidatorIncentiveBps: 1n,
                },
                rate: {
                    $$type: "DebtRate",
                    debtAccumulatedRate: 1000000000n,
                    lastAccumulationTime: 1n,
                },
                tonPriceWithSafetyMargin: 2600000000n,
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
        // console.warn(logger.collect());

        const postitionState = await userPositionContract.getGetPositionState();
        console.log({ postitionState });

        expect(postitionState).toEqual({ $$type: "PositionState", collateral: toNano(100), debt: 0n });
    });

    it("on withdrawStablecoin from positionsManager with healthy position", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            {
                $$type: "WithdrawStablecoinMessage",
                user: user.address,
                amount: toNano(10),
                settings: {
                    $$type: "PoolSettings",
                    liquidationRatio: 1n,
                    stabilityFeeRate: 1n,
                    liquidatorIncentiveBps: 1n,
                },
                rate: {
                    $$type: "DebtRate",
                    debtAccumulatedRate: 1000000000n,
                    lastAccumulationTime: 1n,
                },
                tonPriceWithSafetyMargin: 2600000000n,
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const postitionState = await userPositionContract.getGetPositionState();
        console.log("healthy", { postitionState });

        expect(postitionState).toEqual({ $$type: "PositionState", collateral: toNano(100), debt: toNano(10) });
        expect(await userPositionContract.getGetMessage()).toEqual("Stablecoins sent");
    });

    it("on repayStablecoin from positionsManager with healthy position", async () => {
        let positionState = await userPositionContract.getGetPositionState();
        console.log({ positionState });

        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            {
                $$type: "RepayStablecoinMessage",
                user: user.address,
                amount: 100n,
                settings: {
                    $$type: "PoolSettings",
                    liquidationRatio: 1n,
                    stabilityFeeRate: 1n,
                    liquidatorIncentiveBps: 1n,
                },
                rate: {
                    $$type: "DebtRate",
                    debtAccumulatedRate: 1n,
                    lastAccumulationTime: 1n,
                },
                tonPriceWithSafetyMargin: 2600000000n,
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        positionState = await userPositionContract.getGetPositionState();
        console.log({ positionState });
    });

    it("on stablecoin burned ", async () => {
        await userPositionContract.send(
            stablecoinMaster,
            { value: toNano(1) },
            { $$type: "StablecoinBurnedMessage", user: user.address, amount: 100n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const postitionState = await userPositionContract.getGetPositionState();
        console.log({ postitionState });

        expect(postitionState).toEqual({ $$type: "PositionState", collateral: 100n, debt: 0n });
    });

    it("on withdraw collateral revert if more than exists ", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            {
                $$type: "WithdrawCollateralMessage",
                user: user.address,
                amount: 150n,
                settings: {
                    $$type: "PoolSettings",
                    liquidationRatio: 1n,
                    stabilityFeeRate: 1n,
                    liquidatorIncentiveBps: 1n,
                },
                rate: {
                    $$type: "DebtRate",
                    debtAccumulatedRate: 1n,
                    lastAccumulationTime: 1n,
                },
                tonPriceWithSafetyMargin: 2600000000n,
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const postitionState = await userPositionContract.getGetPositionState();
        console.log("withdraw more", { postitionState });

        expect(postitionState).toEqual({ $$type: "PositionState", collateral: 100n, debt: 0n });
    });

    it("on withdraw collateral decrease position collateral ", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            {
                $$type: "WithdrawCollateralMessage",
                user: user.address,
                amount: 100n,
                settings: {
                    $$type: "PoolSettings",
                    liquidationRatio: 1n,
                    stabilityFeeRate: 1n,
                    liquidatorIncentiveBps: 1n,
                },
                rate: {
                    $$type: "DebtRate",
                    debtAccumulatedRate: 1n,
                    lastAccumulationTime: 1n,
                },
                tonPriceWithSafetyMargin: 2600000000n,
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const postitionState = await userPositionContract.getGetPositionState();
        console.log("withdraw ok", { postitionState });

        expect(postitionState).toEqual({ $$type: "PositionState", collateral: 0n, debt: 0n });
    });
});

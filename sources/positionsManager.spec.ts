import { Address, OpenedContract, Sender, toNano } from "ton";
import { ContractSystem, Logger, Tracker, Treasure } from "ton-emulator";
import { PositionsManagerContract } from "./output/stableton_PositionsManagerContract";
import { UserPositionContract } from "./output/stableton_UserPositionContract";

describe("PositionsManagerContract", () => {
    let system: ContractSystem;
    let owner: Treasure;
    let user: Treasure;
    let gateKeeper: Treasure;
    let stablecoinMaster: Treasure;
    let positionsManagerContract: OpenedContract<PositionsManagerContract>;
    let track: Tracker;
    let logger: Logger;

    beforeAll(async () => {
        system = await ContractSystem.create();
        owner = system.treasure("owner");
        user = system.treasure("user");
        gateKeeper = system.treasure("gateKeeper");
        stablecoinMaster = system.treasure("stablecoinMaster");
        positionsManagerContract = system.open(await PositionsManagerContract.fromInit());
        track = system.track(positionsManagerContract.address);
        logger = system.log(positionsManagerContract.address);
    });

    it("should deploy correctly", async () => {
        await positionsManagerContract.send(
            owner,
            { value: toNano(1) },
            {
                $$type: "SetDeps",
                stablecoinMasterAddress: stablecoinMaster.address,
                gateKeeperAddress: gateKeeper.address,
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        expect(await positionsManagerContract.getLastPositionId()).toEqual(0n);
    });

    it("revert depositCollateral if sent not from gateKeeper", async () => {
        await positionsManagerContract.send(
            owner,
            { value: toNano(101) },
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
    });

    it("deploys new user position contract and forward addCollateral ", async () => {
        await positionsManagerContract.send(
            gateKeeper,
            { value: toNano(101) },
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
    });

    it("newPositionId request from userPosition, increase lastPositionId and deploy positionAddress contract ", async () => {
        const userPosition = system.treasure("userPosition");

        const prevPositionId = await positionsManagerContract.getLastPositionId();
        console.log({ prevPositionId });

        await positionsManagerContract.send(
            userPosition,
            { value: toNano(1) },
            { $$type: "NewPositionIdMessage", user: user.address }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const currentPositionId = await positionsManagerContract.getLastPositionId();
        console.log({ currentPositionId });
        expect(currentPositionId).toBe(prevPositionId + 1n);
    });

    it("on withdrawStable from gateKeeper forwards message to the userPosition", async () => {
        await positionsManagerContract.send(
            gateKeeper,
            { value: toNano(1) },
            {
                $$type: "WithdrawStablecoinMessage",
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
    });

    it("on increaseTotalStable from userPosition forwards message to the gateKeeper", async () => {
        await positionsManagerContract.send(
            gateKeeper,
            { value: toNano(1) },
            { $$type: "IncreaseTotalStableMessage", user: user.address, amount: toNano(100) }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
        // expect(logger.collect()).toMatchSnapshot();
    });

    it("on repayStable from gateKeeper forwards message to the userPosition", async () => {
        await positionsManagerContract.send(
            gateKeeper,
            { value: toNano(1) },
            {
                $$type: "RepayStablecoinMessage",
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
    });

    it("on decreaseTotalStable from userPosition forwards message to the gateKeeper", async () => {
        await positionsManagerContract.send(
            gateKeeper,
            { value: toNano(1) },
            { $$type: "DecreaseTotalStableMessage", user: user.address, amount: toNano(100), fees: 1n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
        // expect(logger.collect()).toMatchSnapshot();
    });

    // it("on withdrawCollateral from gateKeeper forwards message to the userPosition", async () => {
    //     await positionsManagerContract.send(
    //         gateKeeper,
    //         { value: toNano(1) },
    //         { $$type: "WithdrawCollateralMessage", user: user.address, amount: toNano(100), debtRate: 1n }
    //     );

    //     await system.run();
    //     expect(track.collect()).toMatchSnapshot();
    // });

    it("on doWithdrawCollateral from userPosition forwards message to the gateKeeper", async () => {
        await positionsManagerContract.send(
            gateKeeper,
            { value: toNano(1) },
            { $$type: "DoWithdrawCollateralMessage", user: user.address, amount: toNano(100) }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
        // expect(logger.collect()).toMatchSnapshot();
    });
});

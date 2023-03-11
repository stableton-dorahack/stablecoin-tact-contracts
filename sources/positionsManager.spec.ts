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
        positionsManagerContract = system.open(
            await PositionsManagerContract.fromInit(gateKeeper.address, stablecoinMaster.address)
        );
        track = system.track(positionsManagerContract.address);
        logger = system.log(positionsManagerContract.address);
    });

    it("should deploy correctly", async () => {
        await positionsManagerContract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        expect(await positionsManagerContract.getLastPositionId()).toEqual(0n);
    });

    it("revert depositCollateral if sent not from gateKeeper", async () => {
        await positionsManagerContract.send(
            owner,
            { value: toNano(101) },
            { $$type: "DepositCollateralMessage", user: user.address, amount: toNano(100) }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("revert if collateral less than 101 ton", async () => {
        await positionsManagerContract.send(
            gateKeeper,
            { value: toNano(100) },
            { $$type: "DepositCollateralMessage", user: user.address, amount: toNano(100) }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("deploys new user position contract, keep collateral and forward addCollateral ", async () => {
        const balanceBefore = await positionsManagerContract.getBalance();

        await positionsManagerContract.send(
            gateKeeper,
            { value: toNano(101) },
            { $$type: "DepositCollateralMessage", user: user.address, amount: toNano(100) }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const balanceAfter = await positionsManagerContract.getBalance();

        expect(balanceAfter - balanceBefore).toBeGreaterThan(BigInt(toNano(100)));
    });

    it("newPositionId request from userPosition, increase lastPositionId and send it back to sender ", async () => {
        const userPosition = system.treasure("userPosition");

        await positionsManagerContract.send(
            userPosition,
            { value: toNano(1) },
            { $$type: "NewPositionIdMessage", user: user.address }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        expect(await positionsManagerContract.getLastPositionId()).toBe(1n);
    });

    it("on withdrawStable from gateKeeper forwards message to the userPosition", async () => {
        await positionsManagerContract.send(
            gateKeeper,
            { value: toNano(1) },
            { $$type: "WithdrawStablecoinMessage", user: user.address, amount: toNano(100), debtRate: 1n }
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
            { $$type: "RepayStablecoinMessage", user: user.address, amount: toNano(100), debtRate: 1n }
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

    it("on withdrawCollateral from gateKeeper forwards message to the userPosition", async () => {
        await positionsManagerContract.send(
            gateKeeper,
            { value: toNano(1) },
            { $$type: "WithdrawCollateralMessage", user: user.address, amount: toNano(100), debtRate: 1n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

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

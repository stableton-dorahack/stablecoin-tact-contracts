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

        // expect(await positionsManagerContract.getLastPositionId()).toEqual(0n);
    });

    it("on setPositionId from positionsManager should set positionId and deploy positionAddress contract", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            { $$type: "SetPositionIdMessage", positionId: 23n, user: user.address }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        expect(await userPositionContract.getGetPositionId()).toEqual(23n);
    });

    it("on witdrawStablecoin from positionsManager should revert unhealthy position", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            { $$type: "SetPositionIdMessage", positionId: 23n, user: user.address }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        expect(await userPositionContract.getGetPositionId()).toEqual(23n);
    });

    // todo add actions to init healthy position
    it("on addCollateral from positionsManager with healthy position", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            { $$type: "DepositCollateralMessage", user: user.address, amount: 100n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const postitionState = await userPositionContract.getGetPositionState();
        console.log({ postitionState });

        expect(postitionState).toEqual({ $$type: "PositionState", collateral: 100n, debt: 0n });
    });

    // todo add actions to init healthy position
    it("on withdrawStablecoin from positionsManager with healthy position", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            { $$type: "WithdrawStablecoinMessage", user: user.address, amount: 100n, debtRate: 1000n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const postitionState = await userPositionContract.getGetPositionState();
        console.log({ postitionState });

        expect(postitionState).toEqual({ $$type: "PositionState", collateral: 100n, debt: 100n });
    });

    it("on repayStablecoin from positionsManager with healthy position revert if debt less than amount", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            { $$type: "RepayStablecoinMessage", user: user.address, amount: 150n, debtRate: 1000n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const postitionState = await userPositionContract.getGetPositionState();
        console.log({ postitionState });
    });

    it("on repayStablecoin from positionsManager with healthy position", async () => {
        await userPositionContract.send(
            positionsManager,
            { value: toNano(1) },
            { $$type: "RepayStablecoinMessage", user: user.address, amount: 100n, debtRate: 1000n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const postitionState = await userPositionContract.getGetPositionState();
        console.log({ postitionState });
    });

    it("on stablecoin burned ", async () => {
        await userPositionContract.send(
            stablecoinMaster,
            { value: toNano(1) },
            { $$type: "StablecoinBurnedMessage", user: user.address, amount: 100n, fees: 1n }
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
            { $$type: "WithdrawCollateralMessage", user: user.address, amount: 150n, debtRate: 1000n }
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
            { $$type: "WithdrawCollateralMessage", user: user.address, amount: 100n, debtRate: 1000n }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        const postitionState = await userPositionContract.getGetPositionState();
        console.log("withdraw ok", { postitionState });

        expect(postitionState).toEqual({ $$type: "PositionState", collateral: 0n, debt: 0n });
    });
});

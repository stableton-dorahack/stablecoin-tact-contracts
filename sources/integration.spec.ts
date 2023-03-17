import { UserStablecoinWallet } from "./output/stableton_UserStablecoinWallet";
import { PositionAddressContract } from "./output/stableton_PositionAddressContract";
import { UserPositionContract } from "./output/stableton_UserPositionContract";
import { OpenedContract, toNano } from "ton";
import { ContractSystem, Logger, Tracker, Treasure } from "ton-emulator";
import { GateKeeperContract } from "./output/stableton_GateKeeperContract";
import { PositionsManagerContract } from "./output/stableton_PositionsManagerContract";
import { StablecoinMaster } from "./output/stableton_StablecoinMaster";
import { buildOnchainMetadata } from "./utils/jetton-helpers";

describe("Integration test", () => {
    let system: ContractSystem;
    let owner: Treasure;
    let user: Treasure;
    let stablecoinMaster: OpenedContract<StablecoinMaster>;
    let positionsManager: OpenedContract<PositionsManagerContract>;
    let gateKeeperContract: OpenedContract<GateKeeperContract>;
    let stablecoinTracker: Tracker;
    let positionsManagerTracker: Tracker;
    let gateKeeperTracker: Tracker;

    let logger: Logger;

    beforeAll(async () => {
        system = await ContractSystem.create();
        owner = system.treasure("owner");
        user = system.treasure("user");

        const jettonParams = {
            name: "STABLE",
            symbol: "STB3",
            description: "Dorahack stableton",
            image: "https://ipfs.io/ipfs/QmbPZjC1tuP6ickCCBtoTCQ9gc3RpkbKx7C1LMYQdcLwti", // Image url
        };
        let content = buildOnchainMetadata(jettonParams);

        stablecoinMaster = system.open(await StablecoinMaster.fromInit(owner.address, content));
        positionsManager = system.open(await PositionsManagerContract.fromInit());
        gateKeeperContract = system.open(await GateKeeperContract.fromInit());

        stablecoinTracker = system.track(stablecoinMaster.address);
        positionsManagerTracker = system.track(positionsManager.address);
        gateKeeperTracker = system.track(gateKeeperContract.address);

        // logger = system.log(gateKeeperContract.address);

        // deps
        await stablecoinMaster.send(
            owner,
            { value: toNano("1") },
            {
                $$type: "SetDeps",
                positionsManagerAddress: positionsManager.address,
                gateKeeperAddress: gateKeeperContract.address,
                stablecoinMasterAddress: stablecoinMaster.address,
            }
        );

        await system.run();
        expect(stablecoinTracker.collect()).toMatchSnapshot();

        await positionsManager.send(
            owner,
            { value: toNano("1") },
            {
                $$type: "SetDeps",
                positionsManagerAddress: positionsManager.address,
                stablecoinMasterAddress: stablecoinMaster.address,
                gateKeeperAddress: gateKeeperContract.address,
            }
        );
        await system.run();
        expect(positionsManagerTracker.collect()).toMatchSnapshot();

        await gateKeeperContract.send(
            owner,
            { value: toNano("1") },
            {
                $$type: "SetDeps",
                gateKeeperAddress: gateKeeperContract.address,
                stablecoinMasterAddress: stablecoinMaster.address,
                positionsManagerAddress: positionsManager.address,
            }
        );
        await system.run();
        expect(gateKeeperTracker.collect()).toMatchSnapshot();

        // initial pool settings
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
        expect(gateKeeperTracker.collect()).toMatchSnapshot();

        // initial ton price
        await gateKeeperContract.send(
            owner,
            { value: toNano(1) },
            {
                $$type: "UpdateTonPriceMsg",
                price: 3200000000n,
            }
        );
        await system.run();
        expect(gateKeeperTracker.collect()).toMatchSnapshot();
    });

    it("deps set ok", async () => {
        // const addressByPositionsManager = await positionsManager.getUserPositionAddress(user.address);
        // const addressByStableMaster = await stablecoinMaster.getUserPositionAddress(user.address);
        // console.log({
        //     addressByPositionsManager: addressByPositionsManager.toString(),
        //     addressByStableMaster: addressByStableMaster.toString(),
        // });

        // expect(addressByPositionsManager.toString()).toEqual(addressByStableMaster.toString());

        const stablecoinDeps = await stablecoinMaster.getDeps();
        expect(stablecoinDeps.gateKeeperAddress.toString()).toEqual(gateKeeperContract.address.toString());
        expect(stablecoinDeps.positionsManagerAddress.toString()).toEqual(positionsManager.address.toString());

        const positionsManagerDeps = await positionsManager.getDeps();
        expect(positionsManagerDeps.gateKeeperAddress.toString()).toEqual(gateKeeperContract.address.toString());
        expect(positionsManagerDeps.stablecoinMasterAddress.toString()).toEqual(stablecoinMaster.address.toString());

        const gateKeeperDeps = await gateKeeperContract.getDeps();
        expect(gateKeeperDeps.stablecoinMasterAddress.toString()).toEqual(stablecoinMaster.address.toString());
        expect(gateKeeperDeps.positionsManagerAddress.toString()).toEqual(positionsManager.address.toString());
    });

    it("pool settings set ok", async () => {
        const poolSettings = await gateKeeperContract.getPoolSettings();
        expect(poolSettings.liquidationRatio).toEqual(1200000000n);
        expect(poolSettings.liquidatorIncentiveBps).toEqual(10500n);
        expect(poolSettings.stabilityFeeRate).toEqual(1000000000625n);
    });

    it("initial price set ok", async () => {
        const tonPrice = await gateKeeperContract.getTonPrice();
        expect(tonPrice).toEqual(3200000000n);

        const tonPriceWithSafetyMargin = await gateKeeperContract.getTonPriceWithSafetyMargin();
        expect(tonPriceWithSafetyMargin).toEqual(2666666666n);
    });

    it("user actions flow", async () => {
        // first, user deposit collateral, new userPosition contract created

        const collateralDepositAmount = toNano(1); // we deposit 1 ton
        const currentPositionId = await positionsManager.getLastPositionId();

        await gateKeeperContract.send(
            user,
            { value: collateralDepositAmount + toNano(1) }, // add 1 ton for gas
            {
                $$type: "DepositCollateralUserMessage",
                user: user.address,
                amount: collateralDepositAmount,
            }
        );
        await system.run();

        expect(gateKeeperTracker.collect()).toMatchSnapshot();
        expect(positionsManagerTracker.collect()).toMatchSnapshot();

        // -- new userPostion contract should be deployed and collateral value stored

        // lastPositionId incremented by 1
        const lastPositionId = await positionsManager.getLastPositionId();
        expect(lastPositionId - currentPositionId).toEqual(1n);

        // positionsManager has address of userPositionAddress for new position
        const userPositionAddressContractAddress = await positionsManager.getUserPositionAddressById(lastPositionId);
        expect(userPositionAddressContractAddress).toBeDefined();

        // userPositionAdress stores userPosition contract address
        const userPositionAddressContract = system.open(
            await PositionAddressContract.fromAddress(userPositionAddressContractAddress)
        );
        const userPositionContractAddress = await userPositionAddressContract.getPositionAddress();

        // positionsManager know userPositionAddress by user.address
        const positionAddress = await positionsManager.getUserPositionAddress(user.address);
        expect(positionAddress.toString()).toEqual(userPositionContractAddress.toString());

        // userPosition contract has a state with deposited collateral stored
        const userPositionContract = system.open(await UserPositionContract.fromAddress(userPositionContractAddress));
        let positionState = await userPositionContract.getPositionState();

        expect(positionState.collateral).toEqual(collateralDepositAmount);

        // -- user draw stablecoins

        const initialTotalSupply = await stablecoinMaster.getTotalSupply();

        expect(initialTotalSupply).toEqual(0n);

        const stablesBorrowed = toNano(1);

        await gateKeeperContract.send(
            user,
            { value: toNano(1) },
            {
                $$type: "WithdrawStablecoinUserMessage",
                user: user.address,
                amount: stablesBorrowed,
            }
        );

        await system.run();
        expect(gateKeeperTracker.collect()).toMatchSnapshot();
        expect(positionsManagerTracker.collect()).toMatchSnapshot();
        expect(stablecoinTracker.collect()).toMatchSnapshot();

        const userStablecoinWalletAddress = await stablecoinMaster.getGetWalletAddress(user.address);

        const userStableWallet = system.open(await UserStablecoinWallet.fromAddress(userStablecoinWalletAddress));

        // stables on the user wallet
        let userStableBalance = await userStableWallet.getGetBalance();

        expect(userStableBalance).toEqual(stablesBorrowed);

        // total supply increased
        const currentTotalSupply = await stablecoinMaster.getTotalSupply();
        expect(currentTotalSupply).toEqual(stablesBorrowed);

        // position updated
        positionState = await userPositionContract.getPositionState();
        expect(positionState.debt).toEqual(stablesBorrowed);

        userStableBalance = await userStableWallet.getGetBalance();
        console.log("balance before repay", userStableBalance);

        // user pays stables back
        await gateKeeperContract.send(
            user,
            { value: toNano("1") },
            {
                $$type: "RepayStablecoinUserMessage",
                user: user.address,
                amount: stablesBorrowed,
            }
        );

        await system.run();
        expect(gateKeeperTracker.collect()).toMatchSnapshot();
        expect(positionsManagerTracker.collect()).toMatchSnapshot();
        expect(stablecoinTracker.collect()).toMatchSnapshot();

        let positionMessage = await userPositionContract.getMessage();
        console.log({ positionMessage });

        userStableBalance = await userStableWallet.getGetBalance();
        console.log("balance after repay", userStableBalance);

        expect(userStableBalance).toEqual(0n);

        positionState = await userPositionContract.getPositionState();
        console.log({ positionState });
        expect(positionState.debt).toEqual(0n);

        // withdraw collateral

        const collateralToWithdraw = toNano("0.5");

        await gateKeeperContract.send(
            user,
            { value: toNano("1") },
            {
                $$type: "WithdrawCollateralUserMessage",
                user: user.address,
                amount: collateralToWithdraw,
            }
        );

        await system.run();
        expect(gateKeeperTracker.collect()).toMatchSnapshot();
        expect(positionsManagerTracker.collect()).toMatchSnapshot();
        expect(stablecoinTracker.collect()).toMatchSnapshot();

        positionState = await userPositionContract.getPositionState();
        console.log({ positionState });
        expect(positionState.collateral).toEqual(500000000n);

        const message = await userPositionContract.getMessage();
        console.log({ message });
    });
});

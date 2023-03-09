import { toNano } from "ton";
import { ContractSystem } from "ton-emulator";
import { GateKeeperContract } from "./output/stableton_GateKeeperContract";

describe("GateKeeperContract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let user = system.treasure("user");

        let contract = system.open(await GateKeeperContract.fromInit(owner.address));
        console.log("GateKeeper address", contract.address);
        let track = system.track(contract.address);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        // console.log("track.collect()", track.collect());

        expect(track.collect()).toMatchSnapshot();

        // Check counter
        console.log("contract.getPoolSettings()", await contract.getPoolSettings());

        expect(await contract.getPoolSettings()).toEqual({
            $$type: "PoolSettings",
            closeFactorBps: 0n,
            lastAccumulationTime: 0n,
            liquidationRatio: 0n,
            liquidatorIncentiveBps: 0n,
            stabilityFeeRate: 0n,
            treasutyFeeBps: 0n,
        });

        // Set pool settings by owner
        await contract.send(
            owner,
            { value: toNano(1) },
            {
                $$type: "PoolSettingsMsg",
                liquidationRatio: 2n,
                stabilityFeeRate: 2n,
                lastAccumulationTime: 2n,
                closeFactorBps: 2n,
                liquidatorIncentiveBps: 2n,
                treasutyFeeBps: 2n,
            }
        );
        await system.run();
        expect(track.collect()).toMatchSnapshot();

        // Check counter
        console.log("contract.getPoolSettings()", await contract.getPoolSettings());
        expect(await contract.getPoolSettings()).toEqual({
            $$type: "PoolSettings",
            closeFactorBps: 2n,
            lastAccumulationTime: 2n,
            liquidationRatio: 2n,
            liquidatorIncentiveBps: 2n,
            stabilityFeeRate: 2n,
            treasutyFeeBps: 2n,
        });

        // set pool settings by Non - owner;
        await contract.send(
            nonOwner,
            { value: toNano(1) },
            {
                $$type: "PoolSettingsMsg",
                liquidationRatio: 2n,
                stabilityFeeRate: 2n,
                lastAccumulationTime: 2n,
                closeFactorBps: 2n,
                liquidatorIncentiveBps: 2n,
                treasutyFeeBps: 2n,
            }
        );
        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("should set ton price", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await GateKeeperContract.fromInit(owner.address));
        let track = system.track(contract.address);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();

        // Check initial ton price
        console.log("contract.getTonPrice()", await contract.getTonPrice());

        expect(await contract.getTonPrice()).toEqual(0n);

        // Set pool settings by owner
        await contract.send(
            owner,
            { value: toNano(1) },
            {
                $$type: "UpdateTonPriceMsg",
                price: 2n,
            }
        );
        await system.run();
        expect(track.collect()[1]).toMatchSnapshot();

        // Check updated ton price
        console.log("contract.getTonPrice()", await contract.getTonPrice());

        expect(await contract.getTonPrice()).toEqual(2n);

        // set price by Non - owner;
        await contract.send(
            nonOwner,
            { value: toNano(1) },
            {
                $$type: "UpdateTonPriceMsg",
                price: 2n,
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });
});

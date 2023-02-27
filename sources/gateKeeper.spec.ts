import { toNano } from "ton";
import { ContractSystem } from "ton-emulator";
import { GateKeeperContract } from "./output/sample_GateKeeperContract";

describe("contract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await GateKeeperContract.fromInit(owner.address));
        let track = system.track(contract.address);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        // console.log("track.collect()", track.collect());
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 0,
                "events": [
                  {
                    "$type": "deploy",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "cell": "x{946A98B60000000000000000}",
                        "type": "cell",
                      },
                      "bounce": true,
                      "from": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                      "to": "kQAiUPB96fKUtxbLPZ7E4OpT5AIceODUX5rgQLaLpQEKM4j_",
                      "type": "internal",
                      "value": 1000000000n,
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 6772n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "cell": "x{AFF90F570000000000000000}",
                          "type": "cell",
                        },
                        "bounce": true,
                        "from": "kQAiUPB96fKUtxbLPZ7E4OpT5AIceODUX5rgQLaLpQEKM4j_",
                        "to": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                        "type": "internal",
                        "value": 992032000n,
                      },
                    ],
                  },
                ],
              },
            ]
        `);

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
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 1,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "cell": "x{E1B180F1000000020000000200000002000000020000000200000002}",
                        "type": "cell",
                      },
                      "bounce": true,
                      "from": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                      "to": "kQAiUPB96fKUtxbLPZ7E4OpT5AIceODUX5rgQLaLpQEKM4j_",
                      "type": "internal",
                      "value": 1000000000n,
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 4138n,
                  },
                ],
              },
            ]
        `);

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
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 2,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "cell": "x{E1B180F1000000020000000200000002000000020000000200000002}",
                        "type": "cell",
                      },
                      "bounce": true,
                      "from": "kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH",
                      "to": "kQAiUPB96fKUtxbLPZ7E4OpT5AIceODUX5rgQLaLpQEKM4j_",
                      "type": "internal",
                      "value": 1000000000n,
                    },
                  },
                  {
                    "$type": "failed",
                    "errorCode": 4429,
                    "errorMessage": "Invalid sender",
                  },
                  {
                    "$type": "sent-bounced",
                    "message": {
                      "body": {
                        "type": "empty",
                      },
                      "bounce": false,
                      "from": "kQAiUPB96fKUtxbLPZ7E4OpT5AIceODUX5rgQLaLpQEKM4j_",
                      "to": "kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH",
                      "type": "internal",
                      "value": 996112000n,
                    },
                  },
                ],
              },
            ]
        `);
    });
});

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
                      "to": "kQBY4DUzgEkiUS8jtqDMbin6QxrED9SnK_en5gITP7p3FZh2",
                      "type": "internal",
                      "value": 1000000000n,
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 7021n,
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
                        "from": "kQBY4DUzgEkiUS8jtqDMbin6QxrED9SnK_en5gITP7p3FZh2",
                        "to": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                        "type": "internal",
                        "value": 991783000n,
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
                      "to": "kQBY4DUzgEkiUS8jtqDMbin6QxrED9SnK_en5gITP7p3FZh2",
                      "type": "internal",
                      "value": 1000000000n,
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 4300n,
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
                      "to": "kQBY4DUzgEkiUS8jtqDMbin6QxrED9SnK_en5gITP7p3FZh2",
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
                      "from": "kQBY4DUzgEkiUS8jtqDMbin6QxrED9SnK_en5gITP7p3FZh2",
                      "to": "kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH",
                      "type": "internal",
                      "value": 995968000n,
                    },
                  },
                ],
              },
            ]
        `);
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
        expect(track.collect()[1]).toMatchInlineSnapshot(`
              {
                "$seq": 1,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "cell": "x{0D11BABD00000002}",
                        "type": "cell",
                      },
                      "bounce": true,
                      "from": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                      "to": "kQBY4DUzgEkiUS8jtqDMbin6QxrED9SnK_en5gITP7p3FZh2",
                      "type": "internal",
                      "value": 1000000000n,
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 4036n,
                  },
                ],
              }
        `);

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
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 2,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "cell": "x{0D11BABD00000002}",
                        "type": "cell",
                      },
                      "bounce": true,
                      "from": "kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH",
                      "to": "kQBY4DUzgEkiUS8jtqDMbin6QxrED9SnK_en5gITP7p3FZh2",
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
                      "from": "kQBY4DUzgEkiUS8jtqDMbin6QxrED9SnK_en5gITP7p3FZh2",
                      "to": "kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH",
                      "type": "internal",
                      "value": 996232000n,
                    },
                  },
                ],
              },
            ]
        `);
    });
});

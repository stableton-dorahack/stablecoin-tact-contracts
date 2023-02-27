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
                      "to": "kQBNATmthTJkyzRWAWg7M-bwwXZsgasQKAJHjuNTtcGJMHkG",
                      "type": "internal",
                      "value": 1000000000n,
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 6669n,
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
                        "from": "kQBNATmthTJkyzRWAWg7M-bwwXZsgasQKAJHjuNTtcGJMHkG",
                        "to": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                        "type": "internal",
                        "value": 992135000n,
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

        // Increment counter
        // await contract.send(owner, { value: toNano(1) }, "increment");
        // await system.run();
        // expect(track.collect()).toMatchInlineSnapshot(`
        //     [
        //       {
        //         "$seq": 1,
        //         "events": [
        //           {
        //             "$type": "received",
        //             "message": {
        //               "body": {
        //                 "text": "increment",
        //                 "type": "text",
        //               },
        //               "bounce": true,
        //               "from": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
        //               "to": "kQDkoLLa3W2BbNqXWLNcC_fXrudIYpOVQHijNxDB3i-plKNh",
        //               "type": "internal",
        //               "value": 1000000000n,
        //             },
        //           },
        //           {
        //             "$type": "processed",
        //             "gasUsed": 3861n,
        //           },
        //         ],
        //       },
        //     ]
        // `);

        // // Check counter
        // console.log("contract.getPoolSettings()", await contract.getPoolSettings());
        // expect(await contract.getPoolSettings()).toEqual(1n);

        // Non-owner
        // await contract.send(nonOwner, { value: toNano(1) }, "increment");
        // await system.run();
        // expect(track.collect()).toMatchInlineSnapshot(`
        //     [
        //       {
        //         "$seq": 2,
        //         "events": [
        //           {
        //             "$type": "received",
        //             "message": {
        //               "body": {
        //                 "text": "increment",
        //                 "type": "text",
        //               },
        //               "bounce": true,
        //               "from": "kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH",
        //               "to": "kQDkoLLa3W2BbNqXWLNcC_fXrudIYpOVQHijNxDB3i-plKNh",
        //               "type": "internal",
        //               "value": 1000000000n,
        //             },
        //           },
        //           {
        //             "$type": "failed",
        //             "errorCode": 4429,
        //             "errorMessage": "Invalid sender",
        //           },
        //           {
        //             "$type": "sent-bounced",
        //             "message": {
        //               "body": {
        //                 "type": "empty",
        //               },
        //               "bounce": false,
        //               "from": "kQDkoLLa3W2BbNqXWLNcC_fXrudIYpOVQHijNxDB3i-plKNh",
        //               "to": "kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH",
        //               "type": "internal",
        //               "value": 995953000n,
        //             },
        //           },
        //         ],
        //       },
        //     ]
        // `);
    });
});

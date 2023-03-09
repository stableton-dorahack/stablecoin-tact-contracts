import { Address, Sender, toNano } from "ton";
import { ContractSystem, Treasure } from "ton-emulator";
import { PositionAddressContract } from "./output/stableton_PositionAddressContract";
import { UserPositionContract } from "./output/stableton_UserPositionContract";

describe.only("UserPositionContract", () => {
    let system: ContractSystem;
    let owner: Treasure;
    let user: Treasure;

    beforeAll(async () => {
        system = await ContractSystem.create();
        owner = system.treasure("owner");
        user = system.treasure("user");
    });

    it("should deploy correctly", async () => {
        let userPositionContract = system.open(await UserPositionContract.fromInit(user.address));

        let track = system.track(userPositionContract.address);

        await userPositionContract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });

        await system.run();

        expect(track.collect()).toMatchSnapshot();

        const getPositionUser = (await userPositionContract.getGetPositionUser()).toString();

        expect(getPositionUser).toEqual(user.address.toString());
    });

    // it("should set position address if called by userPosition contract", async () => {
    //     let system = await ContractSystem.create();
    //     let owner: Treasure = system.treasure("owner");
    //     let user = system.treasure("user");
    //     let position = system.treasure("position");
    //     console.log("position address", position.address);

    //     let id = 1n;
    //     let positionAddressContract = system.open(await PositionAddressContract.fromInit(id));

    //     let userPositionContract = system.open(await UserPositionContract.fromAddress(position.address));

    //     let track = system.track(positionAddressContract.address);

    //     await positionAddressContract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
    //     // await system.run();
    //     await positionAddressContract.send(
    //         position,
    //         { value: toNano(1) },
    //         { $$type: "SetPositionAddressMessage", user: user.address }
    //     );

    //     await system.run();
    //     expect(track.collect()).toMatchSnapshot();

    //     const setAddress = (await positionAddressContract.getGetPositionAddress()).toString();

    //     console.log("address set", setAddress);

    //     expect(setAddress).toEqual(position.address.toString());
    //     expect(await positionAddressContract.getGetPositionId()).toEqual(id);
    // });
});

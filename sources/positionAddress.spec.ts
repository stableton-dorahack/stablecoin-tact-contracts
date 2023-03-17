import { Address, OpenedContract, Sender, toNano } from "ton";
import { ContractSystem, Logger, Tracker, Treasure } from "ton-emulator";
import { UserPositionContract } from "./output/stableton_UserPositionContract";
import { PositionAddressContract } from "./output/stableton_PositionAddressContract";

describe("PositionAddressContract", () => {
    let system: ContractSystem;
    let owner: Treasure;
    let user: Treasure;
    let position: Treasure;
    let positionsManager: Treasure;

    let positionAddressContract: OpenedContract<PositionAddressContract>;
    let track: Tracker;
    let logger: Logger;

    beforeAll(async () => {
        system = await ContractSystem.create();
        owner = system.treasure("owner");
        user = system.treasure("user");
        position = system.treasure("position");

        positionsManager = system.treasure("positionsManager");
        positionAddressContract = system.open(await PositionAddressContract.fromInit(1n));
        track = system.track(positionAddressContract.address);
    });

    it("should deploy correctly", async () => {
        await positionAddressContract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });

        await system.run();
        expect(track.collect()).toMatchSnapshot();
    });

    it("on setPositionAddress from userPosition", async () => {
        await positionAddressContract.send(
            owner,
            { value: toNano(1) },
            { $$type: "SetPositionAddressMessage", user: user.address, position: position.address }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot();

        expect((await positionAddressContract.getGetPositionAddress()).toString()).toEqual(position.address.toString());
    });
});

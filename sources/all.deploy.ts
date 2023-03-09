import { beginCell, contractAddress, toNano } from "ton";
import { testAddress } from "ton-emulator";
import { GateKeeperContract } from "./output/stableton_GateKeeperContract";
import { PositionAddressContract } from "./output/stableton_PositionAddressContract";
import { PositionsManagerContract } from "./output/stableton_PositionsManagerContract";
import { StablecoinJetton } from "./output/stableton_StablecoinJetton";
import { StablecoinMasterContract } from "./output/stableton_StablecoinMasterContract";
import { UserPositionContract } from "./output/stableton_UserPositionContract";
import { UserStatusContract } from "./output/stableton_UserStatusContract";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";

(async () => {
    // GateKeeper
    let owner = testAddress("owner"); // Replace owner with your address
    let packed = beginCell()
        // .store(storeAdd({ $$type: "Add", amount: 10n }))
        .endCell(); // Replace if you want another message used
    let init = await GateKeeperContract.init(owner);
    let address = contractAddress(0, init);
    let deployAmount = toNano(10);
    let testnet = true;

    // Print basics
    printHeader("GateKeeperContract");
    printAddress(address);
    // printDeploy(init, deployAmount, packed, testnet);

    // Do deploy
    await deploy(init, deployAmount, packed, testnet);
})();

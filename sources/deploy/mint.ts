import { SampleJetton, storeMint } from "./output/jetton_SampleJetton";
import {
    Address,
    beginCell,
    contractAddress,
    fromNano,
    internal,
    SendMode,
    toNano,
    TonClient,
    WalletContractV4,
} from "ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { testAddress } from "ton-emulator";
import { GateKeeperContract } from "../output/stableton_GateKeeperContract";
import { PositionAddressContract } from "../output/stableton_PositionAddressContract";
import { PositionsManagerContract } from "../output/stableton_PositionsManagerContract";
import { StablecoinJettonContract } from "../output/stableton_StablecoinJettonContract";
import { StablecoinMasterContract } from "../output/stableton_StablecoinMasterContract";

import { deploy } from "../utils/deploy";
import { buildOnchainMetadata } from "../utils/jetton-helpers";
import { printAddress, printDeploy, printHeader } from "../utils/print";
import { getHttpEndpoint } from "@orbs-network/ton-access";

const workchain = 0; //we are working in basechain.

(async () => {
    const endpoint = await getHttpEndpoint({ network: "mainnet" });
    const client = new TonClient({
        endpoint: endpoint,
    });

    let owner = Address.parse("EQC6RMuMRAvN3X-sBiNOzV8a2h25vvQrUv8T-04nWPX2ddIs");
    let mnemonics =
        "profit parent fortune gentle panda pony fiber climb ten boost focus magnet pizza topic soup ship lyrics all exotic guilt student answer squirrel spawn";

    let keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    let secretKey = keyPair.secretKey;

    let wallet = WalletContractV4.create({
        workchain,
        publicKey: keyPair.publicKey,
    });

    console.log("wallet address", wallet.address);
    let contract = client.open(wallet);

    // Get deployment wallet balance
    let balance: bigint = await contract.getBalance();
    console.log({ balance });

    // StabletonMaster
    const jettonParams = {
        name: "STABLE",
        symbol: "STB1",
        description: "Dorahack stableton",
        image: "https://ipfs.io/ipfs/QmbPZjC1tuP6ickCCBtoTCQ9gc3RpkbKx7C1LMYQdcLwti", // Image url
    };

    let content = buildOnchainMetadata(jettonParams);
    let init = await SampleJetton.init(owner, content);
    let destination_address = contractAddress(workchain, init);
    console.log("master contract", destination_address);

    let deployAmount = toNano("0.35");
    let supply = toNano(500);
    let seqno: number = await contract.getSeqno();

    let msg = beginCell()
        .store(storeMint({ $$type: "Mint", amount: toNano("430") }))
        .endCell();

    console.log("🛠️Preparing new outgoing massage from deployment wallet. Seqno = ", seqno);
    console.log("Current deployment wallet balance = ", fromNano(balance).toString(), "💎TON");
    console.log("Total supply for the deployed jetton = ", fromNano(supply));

    await contract.sendTransfer({
        seqno,
        secretKey,
        sendMode: SendMode.IGNORE_ERRORS,
        messages: [
            internal({
                value: deployAmount,
                to: destination_address,
                body: msg,
            }),
        ],
    });
    console.log("======deployment message sent to ", destination_address, " ======");
})();

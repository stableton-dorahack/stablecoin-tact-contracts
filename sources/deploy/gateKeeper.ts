import { GateKeeperContract } from "./../output/stableton_GateKeeperContract";
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
import { PositionAddressContract } from "../output/stableton_PositionAddressContract";
import { PositionsManagerContract } from "../output/stableton_PositionsManagerContract";
import { StablecoinJettonContract } from "../output/stableton_StablecoinJettonContract";
import { StablecoinMasterContract } from "../output/stableton_StablecoinMasterContract";

import { deploy } from "../utils/deploy";
import { buildOnchainMetadata } from "../utils/jetton-helpers";
import { printAddress, printDeploy, printHeader } from "../utils/print";
import { getHttpEndpoint } from "@orbs-network/ton-access";

import dotenv from "dotenv";
dotenv.config();

const workchain = 0; //we are working in basechain.

(async () => {
    const endpoint = await getHttpEndpoint({ network: "mainnet" });
    const client = new TonClient({
        endpoint: endpoint,
    });

    let owner = Address.parse("EQC6RMuMRAvN3X-sBiNOzV8a2h25vvQrUv8T-04nWPX2ddIs");
    let mnemonics = process.env.mnemonic;
    let keyPair = await mnemonicToPrivateKey(mnemonics!.split(" "));
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

    let init = await GateKeeperContract.init();

    let destination_address = contractAddress(workchain, init);
    console.log("master contract", destination_address);

    let deployAmount = toNano("0.5");
    let supply = toNano(500);
    let seqno: number = await contract.getSeqno();

    //TL-B mint#01fb345b amount:int257 = Mint
    // let msg = beginCell()
    //     .store(storeDeploy({ $$type: "Deploy", queryId: 1n }))
    //     .endCell();

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
                init: {
                    code: init.code,
                    data: init.data,
                },
                body: msg,
            }),
        ],
    });
    console.log("======deployment message sent to ", destination_address, " ======");
})();

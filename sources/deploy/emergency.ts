import { Message } from "./../output/stableton_StablecoinMasterContract";
import {
    Address,
    beginCell,
    contractAddress,
    fromNano,
    internal,
    Message,
    SendMode,
    Slice,
    storeMessage,
    toNano,
    TonClient,
    WalletContractV4,
} from "ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { buildOnchainMetadata } from "../utils/jetton-helpers";

import { GateKeeperContract } from "../output/stableton_GateKeeperContract";
import { PositionsManagerContract } from "../output/stableton_PositionsManagerContract";
import { StablecoinMaster } from "../output/stableton_StablecoinMaster";

const workchain = 0;

import dotenv from "dotenv";
import {} from "../output/stableton_GateKeeperContract";
dotenv.config();

(async () => {
    const endpoint = await getHttpEndpoint({ network: "mainnet" });
    const client = new TonClient({
        endpoint: endpoint,
    });

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

    // ------ mint dev tokens

    const gateKeeperAddress = Address.parse("EQDN_w1fov1Xd5pwYF_ihE4mIoqRihcvY-YSgTE_o5EgSwz4");

    let deployAmount = toNano("0.5");
    let supply = toNano(500);
    let seqno: number = await contract.getSeqno();

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
                to: gateKeeperAddress,
                body: msg,
            }),
        ],
    });
    console.log("===== emergency message sent to ", gateKeeperAddress, " ======");
})();

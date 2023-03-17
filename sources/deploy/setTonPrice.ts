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
import { getHttpEndpoint } from "@orbs-network/ton-access";

import { storeUpdateTonPriceMsg } from "../output/stableton_GateKeeperContract";

const workchain = 0;

import dotenv from "dotenv";
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

    // ------ set initial pool settings

    const gateKeeperAddress = Address.parse("EQArRm3cFDU5K4XiU067vMKEleHF6mHhfEI8uk8dHlCiR1GY");

    let deployAmount = toNano("0.3");
    let seqno: number = await contract.getSeqno();

    let msg = beginCell()
        .store(
            storeUpdateTonPriceMsg({
                $$type: "UpdateTonPriceMsg",
                price: 2460000000n,
            })
        )
        .endCell();

    console.log("🛠️Preparing new outgoing massage from deployment wallet. Seqno = ", seqno);
    console.log("Current deployment wallet balance = ", fromNano(balance).toString(), "💎TON");

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

    console.log("======set ton price message sent");
})();

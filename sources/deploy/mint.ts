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
import { buildOnchainMetadata } from "../utils/jetton-helpers";

import { GateKeeperContract } from "../output/stableton_GateKeeperContract";
import { PositionsManagerContract } from "../output/stableton_PositionsManagerContract";
import { StablecoinMaster } from "../output/stableton_StablecoinMaster";

const workchain = 0;

import dotenv from "dotenv";
import { storeDeploy, storeMint } from "../output/stableton_UserStablecoinWallet";
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

    const stableMasterAddress = Address.parse("EQBB1pLrZ7joVC8OYGF4_b2O-33MVa2uemI0LFarD2MRrfN8");

    let deployAmount = toNano("0.5");
    let supply = toNano(500);
    let seqno: number = await contract.getSeqno();

    let msg = beginCell()
        .store(storeMint({ $$type: "Mint", amount: supply }))
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
                to: stableMasterAddress,
                body: msg,
            }),
        ],
    });
    console.log("======mint message sent to ", stableMasterAddress, " ======");
})();

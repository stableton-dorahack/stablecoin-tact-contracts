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

    // ------ deploy contracts
    const jettonParams = {
        name: "Stableton",
        symbol: "STAB",
        description: "Dorahack stableton",
        image: "https://ipfs.io/ipfs/QmbPZjC1tuP6ickCCBtoTCQ9gc3RpkbKx7C1LMYQdcLwti",
    };
    let content = buildOnchainMetadata(jettonParams);

    let init = await StablecoinMaster.init(owner, content);
    let stableMasterAddress = contractAddress(workchain, init);
    console.log("stablecoin master contract", stableMasterAddress);

    let deployAmount = toNano("0.5");
    let supply = toNano(500);
    let seqno: number = await contract.getSeqno();

    let msg = beginCell()
        .store(storeDeploy({ $$type: "Deploy", queryId: 1n }))
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
                init: {
                    code: init.code,
                    data: init.data,
                },
                body: msg,
            }),
        ],
    });
    console.log("======deployment message sent to ", stableMasterAddress, " ======");
})();

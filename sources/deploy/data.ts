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
import { UserPositionContract } from "./../output/stableton_UserPositionContract";

const workchain = 0;

import dotenv from "dotenv";
import { storeDeploy, storeMint } from "../output/stableton_UserStablecoinWallet";
import { ContractSystem } from "ton-emulator";
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

    // ------ user position

    const userPosition = await UserPositionContract.fromAddress(
        Address.parse("EQCV9xu2XyTJ9jiHyUkcXIxbhW48iX9bTS1wwjMfEd9zHsco")
    );
})();

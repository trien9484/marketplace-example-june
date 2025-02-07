import {Account, Aptos, AptosConfig, Network, Ed25519PrivateKey, HexInput} from "@aptos-labs/ts-sdk"
import dotenv from 'dotenv';
dotenv.config();

const APTOS_NETWORK: Network = Network.TESTNET;
const config = new AptosConfig({network: APTOS_NETWORK});
const aptos = new Aptos(config);

async function list_with_fixed_price(publisher: Account){
    console.log("Function Call: list_with_fixed_price")

    // console.log("\n=== Addresses ===");
    // console.log(`Publisher: ${publisher.accountAddress.toString()}`);

    let MARKETPLACE_CODE_ADDRESS = process.env.MARKETPLACE_CODE_ADDRESS as string;

    const transaction = await aptos.transaction.build.simple({
        sender: publisher.accountAddress,
        data: {
            function: `${MARKETPLACE_CODE_ADDRESS}::list_and_purchase::list_with_fixed_price`,
            typeArguments: [
                "0x1::aptos_coin::AptosCoin" // <CoinType> type arg
            ],
            functionArguments: [
                "0x5433955bcae9c033644204ef07823dd334125c872e82efdf3b06c8410ffd813c", // object (nft token)
                5_000_000, // price (octas)
            ],
        },
    });

    const senderAuthenticator = aptos.transaction.sign({signer: publisher, transaction});
    const pendingTx = await aptos.transaction.submit.simple({transaction, senderAuthenticator});
    console.log(`Transaction Hash: ${pendingTx.hash}`);
    await aptos.waitForTransaction({
        transactionHash: pendingTx.hash,
    });
}

async function main() {
    const pk = process.env.PRIVATE_KEY as HexInput;
    const account = Account.fromPrivateKey({privateKey: new Ed25519PrivateKey(pk)});
    await list_with_fixed_price(account);
}

main();

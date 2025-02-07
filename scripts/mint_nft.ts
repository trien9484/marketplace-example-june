import {Account, Aptos, AptosConfig, Network, Ed25519PrivateKey, HexInput} from "@aptos-labs/ts-sdk"
import dotenv from 'dotenv';
dotenv.config();

const APTOS_NETWORK: Network = Network.TESTNET;
const config = new AptosConfig({network: APTOS_NETWORK});
const aptos = new Aptos(config);

async function create_collection(publisher: Account){
    console.log("Function Call: create_collection")

    // console.log("\n=== Addresses ===");
    // console.log(`Publisher: ${publisher.accountAddress.toString()}`);

    const transaction = await aptos.transaction.build.simple({
        sender: publisher.accountAddress,
        data: {
            function: `0x4::aptos_token::create_collection`,
            typeArguments: [],
            functionArguments: [
                "Some collection with some description", // description
                100, // max_supply
                "Collection Name 1", // name
                "some_collection.com", // uri
                false, // mutable_description
                false, // mutable_royalty
                false, // mutable_uri
                false, // mutable_token_description
                false, // mutable_token_name
                false, // mutable_token_properties
                false, // mutable_token_uri
                false, // tokens_burnable_by_creator
                false, // tokens_freezable_by_creator
                0, // royalty_numerator
                10000, // royalty_denominator
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

async function mint(publisher: Account){
    console.log("Function Call: mint")

    // console.log("\n=== Addresses ===");
    // console.log(`Publisher: ${publisher.accountAddress.toString()}`);

    const transaction = await aptos.transaction.build.simple({
        sender: publisher.accountAddress,
        data: {
            function: `0x4::aptos_token::mint`,
            typeArguments: [],
            functionArguments: [
                "Collection Name", // collection
                "some token description", // description
                "some token name", // name
                "some_token.com", // uri
                [], // property_keys: vector<String>
                [], // property_types: vector<String>
                [], // property_values: vector<vector<u8>>
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

    // create collection
    await create_collection(account);
    // mint a token
    await mint(account);
}

main();

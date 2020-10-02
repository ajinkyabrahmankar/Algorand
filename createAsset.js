const algosdk = require('algosdk');
const { REPLServer } = require('repl');

const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';

const token = {
    'X-API-Key': 'z1iYRFYAn148YcsCFXezo8iKS6bUPVic1o9TwtjC'
}
const postHeader = {
    'content-type': 'application/x-binary'
}

const algodclient = new algosdk.Algod(token, baseServer, port);

var cp = {
    fee: 0,
    firstRound: 0,
    lastRound: 0,
    genID: "",
    genHash: ""
}

var getChangingParms = async function (algodclient) {
    let params = await algodclient.getTransactionParams();
    cp.firstRound = params.lastRound;
    cp.lastRound = cp.firstRound + parseInt(1000);
    let sfee = await algodclient.suggestedFee();
    cp.fee = sfee.fee;
    cp.fee = 100;
    cp.genID = params.genesisID;
    cp.genHash = params.genesishashb64;
}


var account1_mnemonic = "kingdom text bean cup twelve about drink hunt mix dance discover lucky essence cash strong tunnel clinic praise wink riot check popular barrel about slow";
var account2_mnemonic = "best fun couch history month very notice swim antique future energy renew reduce volcano choice cannon dish region crawl film soon quality lava absent anxiety";
var account3_mnemonic = "lounge render eyebrow spawn sheriff oblige door great thrive decade funny spoil project aerobic manage text amateur exchange hair universe poet pulse result abstract rally";


var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
console.log(recoveredAccount1.addr);
console.log(recoveredAccount2.addr);
console.log(recoveredAccount3.addr);


const waitForConfirmation = async function (algodclient, txId) {
    let lastround = (await algodclient.status()).lastRound;
    while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId);
        if (pendingInfo.round !== null && pendingInfo.round > 0) {

            console.log("Transaction " + pendingInfo.tx + " confirmed in round " + pendingInfo.round);
            break;
        }
        lastround++;
        await algodclient.statusAfterBlock(lastround);
    }
};


/*
(async () => {
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);


    let txn = {
        "from": recoveredAccount1.addr,
        "to": 'U2VHSZL3LNGATL3IBCXFCPBTYSXYZBW2J4OGMPLTA4NA2CB4PR7AW7C77E',
        "fee": 10,
        "amount": 2,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": new Uint8Array(0),
    };
    //let rawSignedTxn = txn.signTxn(recoveredAccount1.sk);
    const rawSignedTxn = algosdk.signTransaction(txn, recoveredAccount1.sk);
    const txId = rawSignedTxn.txID;
    console.log(txId);
    await algodclient.sendRawTransaction(rawSignedTxn.blob, postHeader);
    await waitForConfirmation(algodclient, txId);

})().catch(e => {
    console.log(e);
    console.trace();
});*/


(async () => {
    //let params = await algodclient.getTransactionParams();
    //let endRound = params.lastRound + parseInt(1000);
    await getChangingParms(algodclient);
    let note = undefined;
    let addr = recoveredAccount1.addr;
    let defaultFrozen = false;
    let decimals = 0;
    let totalIssuance = 1000;
    let unitName = "LATINUM";
    let assetName = "latinum";
    let assetURL = "http://someurl";
    let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
    let manager = recoveredAccount2.addr;
    let reserve = recoveredAccount2.addr;
    let freeze = recoveredAccount2.addr;
    let clawback = recoveredAccount2.addr;
    let txn = algosdk.makeAssetCreateTxn(addr, cp.fee, cp.firstRound, cp.lastRound, note,
        cp.genHash, cp.genID, totalIssuance, decimals, defaultFrozen, manager, reserve, freeze,
        clawback, unitName, assetName, assetURL, assetMetadataHash);
    const rawSignedTxn = txn.signTxn(recoveredAccount1.sk);
    console.log("rawSignedTxn : " + rawSignedTxn);
    const txId = rawSignedTxn.txId;
    let assetID = null;
    await algodclient.sendRawTransaction(rawSignedTxn, postHeader);
    await waitForConfirmation(algodclient);
    console.log("Transaction : " + tx.txId);
    assetID = ptx.txresults.createdasset;
    console.log("AssetID = " + assetID);

})().catch(e => {
    console.log(e);
    console.trace();
});




















































/*
// Algorand Algod (v2) example
// Send transaction on TestNet

const algosdk = require('algosdk');
const baseServer = "https://mainnet-algorand.api.purestake.io/ps2";
const port = "";

const token = {
    'X-API-key' : 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab',
}

let algodClient = new algosdk.Algodv2(token, baseServer, port);

(async() => {

    let params = await algodClient.getTransactionParams().do();

    let amount = Math.floor(Math.random() * 1000);
    var mnemonic = "code thrive mouse code badge example pride stereo sell viable adjust planet text close erupt embrace nature upon february weekend humble surprise shrug absorb faint";
    var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);

    let txn = {
        "from": recoveredAccount.addr,
        "to": "UUOB7ZC2IEE4A7JO4WY4TXKXWDFNATM43TL73IZRAFIFFOE6ORPKC7Q62E",
        "fee": 1,
        "amount": amount,
        "firstRound": params.firstRound,
        "lastRound": params.lastRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesisHash,
        "note": new Uint8Array(0),
    };

    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    let sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();

    console.log("Transaction : " + sendTx.txId);
})().catch(e => {
    console.log(e);
});
*/


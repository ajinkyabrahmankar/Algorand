const algosdk = require('algosdk');
const https = require('https');
const request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var acct = null;
acct = algosdk.generateAccount();

account1 = acct.addr;
console.log("Account 1 = " + account1);
var account1_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
console.log("Account Mnemonic 1 = " + account1_mnemonic);
var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
var isValid = algosdk.isValidAddress(recoveredAccount1.addr);
console.log("Is this a valid address: " + isValid);
console.log("Account created. Save off Mnemonic and address");


acct = algosdk.generateAccount();

account2 = acct.addr;
console.log("Account 2 = " + account2);
var account2_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
console.log("Account Mnemonic 2 = " + account2_mnemonic);
var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
var isValid = algosdk.isValidAddress(recoveredAccount2.addr);
console.log("Is this a valid address: " + isValid);
console.log("Account created. Save off Mnemonic and address");

acct = algosdk.generateAccount();

account3 = acct.addr;
console.log("Account 3 = " + account3);
var account3_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
console.log("Account Mnemonic 3 = " + account3_mnemonic);
var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
var isValid = algosdk.isValidAddress(recoveredAccount3.addr);
console.log("Is this a valid address: " + isValid);
console.log("Account created. Save off Mnemonic and address");
console.log("");
console.log("Add funds to all of these accounts using the TestNet Dispenser at https://bank.testnet.algorand.network/ ");
console.log("");
console.log("Copy off these 3 lines of code and they will be pasted in the subsequent Tutorial code");
console.log("");
console.log("var account1_mnemonic = \"" + account1_mnemonic + "\"");
console.log("var account2_mnemonic = \"" + account2_mnemonic + "\"");
console.log("var account3_mnemonic = \"" + account3_mnemonic + "\"");

// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);

var u = "https://testnet-algorand.api.purestake.io/ps2/v2/accounts/"+account1;
var options = {
  'method': 'GET',
  'url': u,
  'headers': {
    'x-api-key': 'z1iYRFYAn148YcsCFXezo8iKS6bUPVic1o9TwtjC'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(JSON.parse(response.body));
});

u = "https://testnet-algorand.api.purestake.io/ps2/v2/accounts/"+account2;
var options = {
  'method': 'GET',
  'url': u,
  'headers': {
    'x-api-key': 'z1iYRFYAn148YcsCFXezo8iKS6bUPVic1o9TwtjC'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(JSON.parse(response.body));
});

u = "https://testnet-algorand.api.purestake.io/ps2/v2/accounts/"+account3;
var options = {
  'method': 'GET',
  'url': u,
  'headers': {
    'x-api-key': 'z1iYRFYAn148YcsCFXezo8iKS6bUPVic1o9TwtjC'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(JSON.parse(response.body));
});

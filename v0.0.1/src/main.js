const { Block } = require("./block");
const { Blockchain } = require("./blockchain");
const { Transaction } = require("./transaction");

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('28807fe39bcb9fdec5ea024321c7845d50cf3fd0cce9106f0183a76cb407bb01');
const myWalletAddress = myKey.getPublic('hex');

let FAScoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
FAScoin.addTransaction(tx1);

console.log('\nStarting the miner...');
FAScoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of filipe is ', FAScoin.getBalanceOfAddress(myWalletAddress));

FAScoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid? ', FAScoin.isChainValid());
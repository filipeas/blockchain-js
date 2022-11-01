const { Block } = require("./block");
const { Blockchain } = require("./blockchain");
const { Transaction } = require("./transaction");

let FAScoin = new Blockchain();
FAScoin.createTransaction(new Transaction('address1', 'address2', 100));
FAScoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\nStarting the miner...');
FAScoin.minePendingTransactions('filipeas-address');

console.log('\nBalance of filipe is ', FAScoin.getBalanceOfAddress('filipeas-address'));

console.log('\nStarting the miner again...');
FAScoin.minePendingTransactions('filipeas-address');

console.log('\nBalance of filipe is ', FAScoin.getBalanceOfAddress('filipeas-address'));
const { Block } = require("./block");
const { Blockchain } = require("./blockchain");

let FAScoin = new Blockchain();
FAScoin.addBlock(new Block(1, '01/11/2022', { amount: 1 }));
FAScoin.addBlock(new Block(2, '01/11/2022', { amount: 6 }));

console.log('Is blockchain valid? ' + FAScoin.isChainValid());

FAScoin.chain[1].data = { amount: 3 };
FAScoin.chain[1].hash = FAScoin.chain[1].calculateHash();

console.log('Is blockchain valid? ' + FAScoin.isChainValid());

console.log(JSON.stringify(FAScoin, null, 4));
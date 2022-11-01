const { Block } = require("./block");
const { Blockchain } = require("./blockchain");

let FAScoin = new Blockchain();
console.log("Mining block 1...");
FAScoin.addBlock(new Block(1, '01/11/2022', { amount: 1 }));

console.log("Mining block 2...");
FAScoin.addBlock(new Block(2, '01/11/2022', { amount: 6 }));

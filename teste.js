const Blockchain = require('./blockchain');

const bc = new Blockchain();
for (let i = 0; i < 10; i++) {
  const block = bc.addBlock(i + 1 + 'U$');
  console.log(block);
}
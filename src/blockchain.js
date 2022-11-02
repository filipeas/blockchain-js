const { Block } = require("./block");
const { Transaction } = require("./transaction");

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 100;
	}

	createGenesisBlock() {
		return new Block('01/11/2022', 'Genesis block', '0');
	}

	getlatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	minePendingTransactions(miningRewardAddress) {
		const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
		this.pendingTransactions.push(rewardTx);

		let block = new Block(Date.now(), this.pendingTransactions, this.getlatestBlock().hash);
		block.mineBlock(this.difficulty);

		console.log('Block successfully mined.');
		this.chain.push(block);

		this.pendingTransactions = [];
	}

	addTransaction(transaction) {
		if (!transaction.fromAddress || !transaction.toAddress) {
			throw new Error('Transaction must include from and to address');
		}

		if (!transaction.isValid()) {
			throw new Error('Cannot add invalid transaction to chain');
		}

		this.pendingTransactions.push(transaction);
	}

	getBalanceOfAddress(address) {
		let balance = 0;

		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAddress === address) {
					balance -= trans.amount;
				}

				if (trans.toAddress === address) {
					balance += trans.amount;
				}
			}
		}

		return balance;
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (!currentBlock.hasValidTransactions()) {
				return false;
			}

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}

		return true;
	}
}

module.exports.Blockchain = Blockchain;
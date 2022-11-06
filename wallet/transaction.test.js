const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;
  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = 'addres-destiny';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it('output the `amount` subtracted from the wallet balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
  });

  it('outputs `amount` added to the recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
  });

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it('validates a valid transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  it('invalidates a corrupt transaction', () => {
    transaction.outputs[0].amount = 5000;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
  });

  describe('Transactiing with amount exceeds balance', () => {
    beforeEach(() => {
      amount = 50000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('does not create the transaction', () => {
      expect(transaction).toEqual(undefined);
    });
  });

  describe('Update a transaction', () => {
    let nextAmount, nextRecipient;
    beforeEach(() => {
      nextAmount = 20;
      nextRecipient = 'next-address-destiny';
      transaction = transaction.update(wallet, nextRecipient, nextAmount);
    });

    it('subtracts the next amount from the sender output', () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount - nextAmount);
    });

    it('outputs an amount for the next recipient', () => {
      expect(transaction.outputs.find(output => output.address === nextRecipient).amount).toEqual(nextAmount);
    });
  });
});
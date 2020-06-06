class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    let result = 0;
    this.transactions.forEach(t => {
      result += t.value;
    });
    return result;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance > this.amount);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

// DRIVER CODE BELOW

const myAccount = new Account('Erica');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Withdrawal(50.00, myAccount);
console.log('Commit result of withdrawing $50 when balance is $0)', t1.commit());

const t2 = new Deposit(120.00, myAccount);
console.log('Commit result of depositing $120 when balance is $0', t2.commit());

const t3 = new Withdrawal(20.00, myAccount);
console.log('Commit result of depositing $20 when balance is $120', t3.commit());

console.log('Ending Balance:', myAccount.balance);

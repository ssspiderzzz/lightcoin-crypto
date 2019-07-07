class Account {
  constructor(userName) {
    this.userName = userName;
    this.transactions = [];
  }
  get balance() {
    // Calculate the balance using the transaction objects.
    let sum = 0;
    for (let i of this.transactions) {
      sum += i;
    }
    return sum;
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
    if (this.isAllowed) {
      this.account.addTransaction(this.value);
      console.log(`Transaction done.\nCurrent balance: ${this.account.balance}`);
    } else {
      console.log(`Insufficient fund, transaction cancelled.`);
    }
  }

}

class Deposit extends Transaction {
  get isAllowed() {
    return true;
  }
  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  get isAllowed() {
    if (this.amount <= this.account.balance) {
      return true;
    } else {
      return false;
    }
  }
  get value() {
    return -this.amount;
  }
}
// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");
console.log(myAccount);

let t1 = new Deposit(1000, myAccount);
console.log('Transaction 1:', t1);
t1.commit();
console.log('');

let t2 = new Withdrawal(459.99, myAccount);
console.log('Transaction 2:', t2);
t2.commit();
console.log('');

let t3 = new Withdrawal(600, myAccount);
console.log('Transaction 3:', t3);
t3.commit();
console.log('');

let t4 = new Withdrawal(112.55, myAccount);
console.log('Transaction 4:', t4);
t4.commit();
console.log('');

console.log(myAccount);
console.log(`Current balance: ${myAccount.balance}`);

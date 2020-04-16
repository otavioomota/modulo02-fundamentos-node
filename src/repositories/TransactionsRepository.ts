import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeArray: Transaction[] = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcomeArray: Transaction[] = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const income = incomeArray.reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);

    const outcome = outcomeArray.reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

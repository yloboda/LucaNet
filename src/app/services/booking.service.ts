import { Injectable } from '@angular/core';
import { CURRENCIES } from '../constants/currencyList';
import { of } from 'rxjs';
import { TYPES } from '../constants/typeList';
import {TRANSACTIONS} from "../constants/transactionsList";
import {Transaction} from "../models/transaction";

@Injectable({ providedIn: 'root' })

export class BookingService {
  private _transactions: Transaction[] = TRANSACTIONS;

  get transactions():Transaction[] {
    return this._transactions;
  }

  getCurrencyList() {
    return of(CURRENCIES);
  }

  getTypeList() {
    return of(TYPES);
  }

  getTransactionsIdsByType(type: string) {
    return of(this.transactions.filter(item => item.type === type).map(item => item.parent_id));
  }

  updateTransaction(transactions: Transaction[], transaction: Transaction) {
    return of(transactions.map(item => item.parent_id === transaction.parent_id ? transaction : item));
  }

  calculateTransactionSum(transactions: Transaction[]) {
    return of(transactions.reduce((partialSum, a) => partialSum + a.amount, 0));
  }
}

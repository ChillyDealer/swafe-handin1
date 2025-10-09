import { Component, inject } from '@angular/core';
import {Transaction, TransactionService} from '../../../transaction-service';
import { CommonModule } from '@angular/common';
import { Combobox } from "../../../combobox/combobox";

@Component({
  selector: 'app-transaction-history',
  imports: [CommonModule, Combobox],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css'
})
export class TransactionHistory {
  transactionService = inject(TransactionService);

  filteredTransactions = this.transactionService.GetFilteredTransactions;

  deleteTransaction(transaction: Transaction) {
    if (confirm(`Are you sure you want to delete this transaction of $${transaction.amount}?`)) {
      this.transactionService.deleteTransaction(transaction.uid);
    }
  }
}

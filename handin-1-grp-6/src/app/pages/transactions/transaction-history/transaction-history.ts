import { Component, inject } from '@angular/core';
import { TransactionService } from '../../../transaction-service';
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
  selectedCardNumber = signal<number | null>(null);
    return this.availableCardNumbers().filter(cardNumber =>

  filteredTransactions = this.transactionService.GetFilteredTransactions;
    return this.transactions().filter(transaction =>
  selectCard(cardNumber: number) {


  deleteTransaction(transaction: any) {
    if (confirm(`Are you sure you want to delete this transaction of $${transaction.amount}?`)) {
      this.transactionService.deleteTransaction(transaction.uid);
    }
  }
}

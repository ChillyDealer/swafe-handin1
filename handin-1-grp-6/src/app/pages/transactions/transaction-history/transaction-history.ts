import { Component, inject, computed, signal } from '@angular/core';
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
  
  // Local state for filtering
  selectedCardNumber = signal<number | null>(null);
  
  // Get all transactions from service
  allTransactions = this.transactionService.GetTransactions;
  
  // Compute filtered transactions based on local selection
  filteredTransactions = computed(() => {
    const selectedCard = this.selectedCardNumber();
    if (!selectedCard) {
      return this.allTransactions();
    }
    return this.allTransactions().filter(transaction =>
      transaction.cardNumber === selectedCard
    );
  });

  // Handle card selection from combobox
  onCardSelectionChange(cardNumber: number | null) {
    this.selectedCardNumber.set(cardNumber);
  }

  deleteTransaction(transaction: Transaction) {
    if (confirm(`Are you sure you want to delete this transaction of $${transaction.amount}?`)) {
      this.transactionService.deleteTransaction(transaction.uid);
    }
  }
}

import { Component, inject } from '@angular/core';
import { TransactionService } from '../../../transaction-service';

@Component({
  selector: 'app-transaction-history',
  imports: [],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css'
})
export class TransactionHistory {
  transactionService = inject(TransactionService);
  transactions = this.transactionService.GetTransactions;
}

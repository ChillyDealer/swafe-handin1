import { Component, inject } from '@angular/core';
import { TransactionService } from '../../../transaction-service';
import { ComboBox } from "../../../combo-box/combo-box";

@Component({
  selector: 'app-transaction-history',
  imports: [ComboBox],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css'
})
export class TransactionHistory {
  transactionService = inject(TransactionService);
  transactions = this.transactionService.GetTransactions;
}

import { Component } from '@angular/core';
import { TransactionHistory } from "./transaction-history/transaction-history";

@Component({
  selector: 'app-transactions',
  imports: [TransactionHistory],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions {
  
}

import { Component } from '@angular/core';
import { TransactionHistory } from "./transaction-history/transaction-history";
import {TransactionCreator} from './transaction-creator/transaction-creator';

@Component({
  selector: 'app-transactions',
  imports: [TransactionHistory, TransactionCreator],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions {

}

import { Injectable } from '@angular/core';
import { CreditCard } from './Models/CreditCard';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
}


export interface Transaction {
  // credit_card, amount, currency, comment, date
  credit_card: CreditCard;
  amount: number;
  currency: string;
  comment: string;
  date: string;

}
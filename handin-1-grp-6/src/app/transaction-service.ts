import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CreditCard } from './Models/CreditCard';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login-service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  protected transactions = signal<Transaction[]>([]);
  private http = inject(HttpClient);
  private login = inject(LoginService);
  private baseUrl = 'https://assignment1.swafe.dk/api/Transaction';

  constructor() {
    const isReady = computed(() => this.login.ready());
    effect(() => {
      if (isReady()) {
        this.fetchTransactions();
        console.log(this.transactions());
      }
    })
  }

  get GetTransactions() {
    return this.transactions;
  }

  protected fetchTransactions() {
    this.http.get<Transaction[]>(this.baseUrl).subscribe(transactions => {
      this.transactions.set(transactions);
      console.log(this.transactions());
    });
  }
}


export interface Transaction {
  // credit_card, amount, currency, comment, date
  // credit_card: CreditCard;
  cardNumber: string;
  amount: number;
  currencyCode: string;
  comment: string;
  transactionDate: string;
}
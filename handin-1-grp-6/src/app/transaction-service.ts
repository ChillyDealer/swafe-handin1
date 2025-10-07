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
      }
    })
  }

  get GetTransactions() {
    return this.transactions;
  }

  protected fetchTransactions() {
    this.http.get<Transaction[]>(this.baseUrl).subscribe(transactions => {
      this.transactions.set(transactions);
    });
  }

  deleteTransaction(transactionId: string) {
    return this.http.delete(`${this.baseUrl}/uid?uid=${transactionId}`).subscribe({
      next: () => {
        const currentTransactions = this.transactions();
        const updatedTransactions = currentTransactions.filter(t => t.uid !== transactionId);
        this.transactions.set(updatedTransactions);
      },
      error: (err) => {
        console.error('Failed to delete transaction:', err);
      }
    });
  }
}


export interface Transaction {
  uid: string;
  cardNumber: string;
  amount: number;
  currencyCode: string;
  comment: string;
  transactionDate: string;
}
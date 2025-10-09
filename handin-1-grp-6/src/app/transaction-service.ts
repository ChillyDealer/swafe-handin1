import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {CreditCard} from './Models/CreditCard';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login-service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  protected transactions = signal<Transaction[]>([]);
  private http = inject(HttpClient);
  private login = inject(LoginService);
  private baseUrl = 'https://assignment1.swafe.dk/api/Transaction';

  // Shared filtering state
  selectedCardNumber = signal<number | null>(null);

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

  get GetFilteredTransactions() {
    return computed(() => {
      const selectedCard = this.selectedCardNumber();
      if (!selectedCard) {
        return this.transactions();
      }
      return this.transactions().filter(transaction =>
        transaction.cardNumber === selectedCard
      );
    });
  }

  get GetAvailableCardNumbers() {
    return computed(() => {
      const cardNumbers = this.transactions().map(t => t.cardNumber);
      return [...new Set(cardNumbers)].sort();
    });
  }

  setSelectedCardNumber(cardNumber: number | null) {
    this.selectedCardNumber.set(cardNumber);
  }

  protected fetchTransactions() {
    this.http.get<Transaction[]>(this.baseUrl).subscribe(transactions => {
      this.transactions.set(transactions);
    });
  }

  public postTransaction(transaction: Transaction) {
    this.login.ready(); // Just calls login
    return this.http.post(this.baseUrl, transaction);
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
  cardNumber: number;
  amount: number;
  currencyCode: string;
  comment: string;
  transactionDate: string;
}

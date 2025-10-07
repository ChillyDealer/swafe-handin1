import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreditCard} from './Models/CreditCard';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private http = inject(HttpClient);
  private baseUrl = 'https://assignment1.swafe.dk/api';

  public postCreditCard(creditCard: CreditCard) {
    return this.http.post(`${this.baseUrl}/CreditCard`, creditCard);
  }
}

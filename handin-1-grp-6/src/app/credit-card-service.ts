import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreditCard} from './Models/CreditCard';
import {LoginService} from './login-service';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private http = inject(HttpClient);
  private login = inject(LoginService);
  private baseUrl = 'https://assignment1.swafe.dk/api';

  public postCreditCard(creditCard: CreditCard) {
    this.login.ready(); // Just calls login
    return this.http.post(`${this.baseUrl}/CreditCard`, creditCard);
  }
}

import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

@Injectable()
export class LoginService {
  private readonly baseUrl = 'https://assignment1.swafe.dk/api';

  private readonly _token = signal<string | null>(null); 
  readonly token = computed(() => this._token());
  readonly isLoggedIn = computed(() => !!this.token()); 
  readonly ready = signal(false);

  constructor(private http: HttpClient) {
    localStorage.removeItem('auth_token'); // clear old token

    queueMicrotask(() => { // schedule login, en funktion i angular 
      this.login('g06@bank.dk', '1234').subscribe({
        next: () => {
          this.ready.set(true);
        },
        error: (err) => {
          this.ready.set(false);
        },
      });
    });

    effect(() => {
      const t = this._token();
      if (t) {
        localStorage.setItem('auth_token', t);
      } else {
        localStorage.removeItem('auth_token');
      }
    });
  }

  login(username: string, password: string) {
    return this.http
      .post(`${this.baseUrl}/Login`, { username, password }, { responseType: 'text' }) // ikke json men text
      .pipe(
        map((token) => {
          if (!token) throw new Error('no token'); 
          this._token.set(token);
          return token;
        }),
        catchError((err) => {
          return of(null);
        })
      );
  }
}

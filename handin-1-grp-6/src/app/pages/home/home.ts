import { Component, inject, effect, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { LoginService } from '../../login-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor], 
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private http = inject(HttpClient); 
  private login = inject(LoginService);

  cards = signal<any[]>([]); // array for cards
  loading = signal(true); 

  constructor() {
    const isReady = computed(() => this.login.ready()); // noget fis for at undgå at køre 2 gange

    effect(() => {
      if (!isReady()) return; 

      this.loading.set(true); 

      this.http.get<any[]>('https://assignment1.swafe.dk/api/CreditCard').subscribe({ 
        next: (data) => {
          this.cards.set(data); 
          this.loading.set(false); // skift til cards når loaded
        },
        error: (err) => {
          this.loading.set(false); 
          this.cards.set([]);
        },
      });
    });
  }
}

import { Component, inject, effect, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { LoginService } from '../../login-service';
import { CreditCard } from '../../Models/CreditCard';
import { CreditCardDetails } from './credit-card-details/credit-card-details';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, CreditCardDetails], 
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private http = inject(HttpClient); 
  private login = inject(LoginService);

  cards = signal<CreditCard[]>([]); // array for cards
  loading = signal(true); 
  isModalOpen = signal(false);
  selectedCard = signal<CreditCard | null>(null); 

  constructor() {
    const isReady = computed(() => this.login.ready()); // noget fis for at undgå at køre 2 gange

    effect(() => {
      if (!isReady()) return; 

      this.loading.set(true); 

      this.http.get<CreditCard[]>('https://assignment1.swafe.dk/api/CreditCard').subscribe({ 
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

  openModal(card: CreditCard) {
    this.selectedCard.set(card);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedCard.set(null);
  }

  onCardDeleted(cardNumber: string) {
    const currentCards = this.cards();
    const updatedCards = currentCards.filter(card => String(card.cardNumber) !== cardNumber);
    this.cards.set(updatedCards);
  }
}

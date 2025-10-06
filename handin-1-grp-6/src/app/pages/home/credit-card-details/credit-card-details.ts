import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CreditCard } from '../../../Models/CreditCard';

@Component({
  selector: 'app-credit-card-details',
  imports: [NgIf],
  templateUrl: './credit-card-details.html',
  styleUrl: './credit-card-details.css'
})
export class CreditCardDetails {
  private http = inject(HttpClient);

  @Input() isOpen: boolean = false;
  @Input() card: CreditCard | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() cardDeleted = new EventEmitter<string>();

  onClose() {
    this.closeModal.emit();
  }

  onClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onDeleteCard() {
    if (this.card) {
      const cardNumber = this.card.cardNumber;
      
      this.http.delete(`https://assignment1.swafe.dk/api/CreditCard/cardnumber?cardnumber=${cardNumber}`)
        .subscribe({
          next: () => {
            this.cardDeleted.emit(cardNumber);
            this.onClose();
          },
          error: (err) => {
            console.error('Error:', err);
            alert('Failed to delete...');
          }
        });
    }
  }
}

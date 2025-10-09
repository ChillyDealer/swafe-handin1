import { Component, Input, Output, EventEmitter, inject, OnChanges, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CreditCard } from '../../../Models/CreditCard';
import { ExpirationDatePipe } from '../../../pipes/expiration-date.pipe';

@Component({
  selector: 'app-credit-card-details',
  standalone: true,
  imports: [NgIf, ExpirationDatePipe],
  templateUrl: './credit-card-details.html',
  styleUrl: './credit-card-details.css'
})
export class CreditCardDetails implements OnChanges, OnDestroy {
  private http = inject(HttpClient);

  @Input() isOpen: boolean = false;
  @Input() card: CreditCard | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() cardDeleted = new EventEmitter<string>();

  ngOnChanges() {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }

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
            this.onClose();
            window.location.reload();
          },
          error: (err) => {
            console.error('Error:', err);
            alert('Failed to delete...');
          }
        });
    }
  }
}

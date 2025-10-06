import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-credit-card-details',
  imports: [NgIf],
  templateUrl: './credit-card-details.html',
  styleUrl: './credit-card-details.css'
})
export class CreditCardDetails {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  onClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}

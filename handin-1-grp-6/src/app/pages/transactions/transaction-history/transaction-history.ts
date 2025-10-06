import { Component, inject, signal, computed, HostListener, ElementRef } from '@angular/core';
import { TransactionService } from '../../../transaction-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-history',
  imports: [CommonModule],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css'
})
export class TransactionHistory {
  transactionService = inject(TransactionService);
  elementRef = inject(ElementRef);
  transactions = this.transactionService.GetTransactions;
  
  isDropdownOpen = signal(false);
  selectedCardNumber = signal<string | null>(null);
  filterText = signal('');
  
  availableCardNumbers = computed(() => {
    const cardNumbers = this.transactions().map(t => t.cardNumber);
    return [...new Set(cardNumbers)].sort();
  });
  
  filteredCardNumbers = computed(() => {
    const filter = this.filterText().toLowerCase();
    if (!filter) {
      return this.availableCardNumbers();
    }
    return this.availableCardNumbers().filter(cardNumber => 
      cardNumber.toString().includes(filter)
    );
  });
  
  filteredTransactions = computed(() => {
    const selectedCard = this.selectedCardNumber();
    if (!selectedCard) {
      return this.transactions();
    }
    return this.transactions().filter(transaction => 
      transaction.cardNumber === selectedCard
    );
  });
  
  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }
  
  closeDropdown() {
    this.isDropdownOpen.set(false);
  }
  
  selectCard(cardNumber: string) {
    this.selectedCardNumber.set(cardNumber);
    this.filterText.set('');
    this.closeDropdown();
  }
  
  clearSelection() {
    this.selectedCardNumber.set(null);
    this.filterText.set('');
    this.closeDropdown();
  }
  
  onFilterInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filterText.set(target.value);
    this.selectedCardNumber.set(null); // Clear selectionen
    this.isDropdownOpen.set(true);
  }
  
  onInputFocus() {
    this.isDropdownOpen.set(true);
  }
  
  getInputValue(): string {
    if (this.filterText()) {
      return this.filterText();
    }
    if (this.selectedCardNumber()) {
      return `Card: ${this.selectedCardNumber()}`;
    }
    return '';
  }
  
  getDisplayText(): string {
    if (this.selectedCardNumber()) {
      return `Card: ${this.selectedCardNumber()}`;
    }
    return this.filterText() || 'Select a card number...';
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}

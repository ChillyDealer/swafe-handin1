import { Component, computed, ElementRef, HostListener, inject, signal } from '@angular/core';
import { TransactionService } from '../transaction-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-combobox',
  imports: [CommonModule],
  templateUrl: './combobox.html',
  styleUrl: './combobox.css'
})
export class Combobox {
  transactionService = inject(TransactionService);
  elementRef = inject(ElementRef);
  transactions = this.transactionService.GetTransactions;

  isDropdownOpen = signal(false);
  selectedCardNumber = this.transactionService.selectedCardNumber;
  filterText = signal('');

  availableCardNumbers = this.transactionService.GetAvailableCardNumbers;

  filteredCardNumbers = computed(() => {
    const filter = this.filterText().toLowerCase();
    if (!filter) {
      return this.availableCardNumbers();
    }
    return this.availableCardNumbers().filter(cardNumber =>
      cardNumber.toString().includes(filter)
    );
  });

  filteredTransactions = this.transactionService.GetFilteredTransactions;

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  selectCard(cardNumber: number) {
    this.transactionService.setSelectedCardNumber(cardNumber);
    this.filterText.set('');
    this.closeDropdown();
  }

  clearSelection() {
    this.transactionService.setSelectedCardNumber(null);
    this.filterText.set('');
    this.closeDropdown();
  }

  onFilterInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filterText.set(target.value);
    this.transactionService.setSelectedCardNumber(null); // Clear selection
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

  deleteTransaction(transaction: any) {
    if (confirm(`Are you sure you want to delete this transaction of $${transaction.amount}?`)) {
      this.transactionService.deleteTransaction(transaction.uid);
    }
  }

}

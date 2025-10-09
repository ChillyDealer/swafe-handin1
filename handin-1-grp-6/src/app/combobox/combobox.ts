import { Component, computed, ElementRef, HostListener, inject, signal, output, input, effect } from '@angular/core';
import { TransactionService, Transaction } from '../transaction-service';
import { CommonModule } from '@angular/common';

export interface ComboboxOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-combobox',
  imports: [CommonModule],
  templateUrl: './combobox.html',
  styleUrl: './combobox.css'
})
export class Combobox {
  private transactionService = inject(TransactionService);
  elementRef = inject(ElementRef);

  // transactions prop
  transactions = input<Transaction[]>([]);

  // output til listen
  selectedCardChange = output<number | null>();

  // Internal state (kig væk)
  isDropdownOpen = signal(false);
  selectedCardNumber = signal<number | null>(null);
  filterText = signal('');

  availableCardNumbers = computed(() => {
    const cardNumbers = this.transactions().map(t => t.cardNumber);
    return [...new Set(cardNumbers)].sort();
  });

  cardOptions = computed<ComboboxOption[]>(() => {
    return this.availableCardNumbers().map(cardNumber => ({
      value: cardNumber,
      label: `Card: ${cardNumber}`
    }));
  });

  filteredCardOptions = computed(() => {
    const filter = this.filterText().toLowerCase();
    if (!filter) {
      return this.cardOptions();
    }
    return this.cardOptions().filter(option =>
      option.label.toLowerCase().includes(filter) ||
      option.value.toString().includes(filter)
    );
  });

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  selectCard(cardNumber: number) {
    this.selectedCardNumber.set(cardNumber);
    this.selectedCardChange.emit(cardNumber);
    this.filterText.set('');
    this.closeDropdown();
  }

  clearSelection() {
    this.selectedCardNumber.set(null);
    this.selectedCardChange.emit(null);
    this.filterText.set('');
    this.closeDropdown();
  }

  onFilterInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filterText.set(target.value);
    this.selectedCardNumber.set(null);
    this.selectedCardChange.emit(null);
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}

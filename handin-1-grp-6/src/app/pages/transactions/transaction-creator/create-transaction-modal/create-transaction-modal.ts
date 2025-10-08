import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TransactionService} from '../../../../transaction-service';

@Component({
  selector: 'app-create-transaction-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-transaction-modal.html',
})
export class CreateTransactionModal implements OnInit {
  private transactionService = inject(TransactionService);
  private fb = inject(FormBuilder);

  protected transactionForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateTransactionModal>) {
  }

  ngOnInit() {
    this.transactionForm = this.fb.group({
      cardNumber: [1234567, [
        // Validators.required,
        // Validators.pattern(/^\d{7,16}$/)
      ]],
      amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      currencyCode: ['', [
        Validators.required,
      ]],
      comment: ['', []],
      transactionDate: ['', [
        Validators.required,
      ]],
    });
  }

  protected get cardNumber() {
    return this.transactionForm.get('cardNumber')!;
  }

  protected get amount() {
    return this.transactionForm.get('amount')!;
  }

  protected get currencyCode() {
    return this.transactionForm.get('currencyCode')!;
  }

  protected get comment() {
    return this.transactionForm.get('comment')!;
  }

  protected get transactionDate() {
    return this.transactionForm.get('transactionDate')!;
  }

  protected onSubmit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    this.transactionService.postTransaction(this.transactionForm.value).subscribe({
      next: (response) => {
        console.log("🏹 Transaction posted successfully!", response)
        this.dialogRef.close();
      },
      error: (error) => console.warn("🙈 Error posting transaction", error)
    })
  }

  onCancel() {
    this.dialogRef.close();
  }
}

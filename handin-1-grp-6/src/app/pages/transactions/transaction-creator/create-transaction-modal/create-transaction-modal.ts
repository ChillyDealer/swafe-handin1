import {Component, inject, OnInit} from '@angular/core';
import {CreditCardService} from '../../../../credit-card-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TransactionService} from '../../../../transaction-service';

@Component({
  selector: 'app-create-transaction-modal',
  imports: [],
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
      creditCard: ['', [
        Validators.required,
        Validators.pattern(/^\d{7,16}$/)
      ]],
      amount: ['', Validators.required, Validators.pattern(/^\d$/)],
      currency: ['', [
        Validators.required,
      ]],
      comment: ['', []],
      date: ['', [
        Validators.required,
      ]],
    });
  }

  protected get creditCard() {
    return this.transactionForm.get('creditCard')!;
  }

  protected get amount() {
    return this.transactionForm.get('amount')!;
  }

  protected get currency() {
    return this.transactionForm.get('currency')!;
  }

  protected get comment() {
    return this.transactionForm.get('comment')!;
  }

  protected get date() {
    return this.transactionForm.get('date')!;
  }

  protected onSubmit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    // this.transactionService.postCreditCard(this.transactionForm.value).subscribe({
    //   next: (response) => {
    //     console.log("💳 Credit card posted successfully!", response)
    //     this.dialogRef.close();
    //   },
    //   error: (error) => console.warn("🙈 Error posting credit card", error)
    // })
  }

  onCancel() {
    this.dialogRef.close();
  }
}

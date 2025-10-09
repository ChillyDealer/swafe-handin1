import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CreditCardService} from '../../../../credit-card-service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-credit-card-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create-credit-card-modal.html',
})
export class CreateCreditCardModal implements OnInit {
  private creditCardService = inject(CreditCardService);
  private fb = inject(FormBuilder);

  protected creditCardForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateCreditCardModal>) {
  }

  ngOnInit() {
    this.creditCardForm = this.fb.group({
      cardNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{7,16}$/)
      ]],
      cardHolderName: ['', Validators.required],
      cscCode: ['', [
        Validators.required,
        Validators.pattern(/^\d{3}$/)
      ]],
      expirationDateMonth: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(12)
      ]],
      expirationDateYear: ['', [
        Validators.required,
        Validators.min(new Date().getFullYear())
      ]],
      issuer: ['']
    });
  }

  protected get cardNumber() {
    return this.creditCardForm.get('cardNumber')!;
  }

  protected get cardHolderName() {
    return this.creditCardForm.get('cardHolderName')!;
  }

  protected get cscCode() {
    return this.creditCardForm.get('cscCode')!;
  }

  protected get expirationDateMonth() {
    return this.creditCardForm.get('expirationDateMonth')!;
  }

  protected get expirationDateYear() {
    return this.creditCardForm.get('expirationDateYear')!;
  }

  protected get issuer() {
    return this.creditCardForm.get('issuer')!;
  }

  protected onSubmit() {
    if (this.creditCardForm.invalid) {
      this.creditCardForm.markAllAsTouched();
      return;
    }

    this.creditCardService.postCreditCard(this.creditCardForm.value).subscribe({
      next: (response) => {
        console.log("💳 Credit card posted successfully!", response)
        this.dialogRef.close();
      },
      error: (error) => console.warn("🙈 Error posting credit card", error)
    })
  }

  onCancel() {
    this.dialogRef.close();
  }
}

import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {CreditCard} from '../../../../Models/CreditCard';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {CreditCardService} from '../../../../credit-card-service';

@Component({
  selector: 'app-create-credit-card-modal',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './create-credit-card-modal.html',
  styleUrl: './create-credit-card-modal.css'
})
export class CreateCreditCardModal {
  private creditCardService = inject(CreditCardService);

  public creditCardInput: CreditCard = {
    cardNumber: 0,
    cardHolderName: "",
    cscCode: 0,
    issuer: "",
    expirationDateMonth: 0,
    expirationDateYear: 0
  };

  constructor(public dialogRef: MatDialogRef<CreateCreditCardModal>) {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.warn("👺❌🫁 THE FORM IS INVALID");
      return;
    }

    this.creditCardService.postCreditCard(form.value).subscribe({
      next: (response) => console.log("💳 Credit card posted successfully!", response),
      error: (error) => console.warn("🙈 Error posting credit card", error)
    })
  }

  onCancel() {
    this.dialogRef.close();
  }
}

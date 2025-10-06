import {Component} from '@angular/core';
import {FormField} from '../../../../form-field/form-field';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-credit-card-modal',
  standalone: true,
  imports: [
    FormField,
    FormsModule
  ],
  templateUrl: './create-credit-card-modal.html',
  styleUrl: './create-credit-card-modal.css'
})
export class CreateCreditCardModal {
  onSubmit(form: NgForm) {
    console.log(form);
  }
}

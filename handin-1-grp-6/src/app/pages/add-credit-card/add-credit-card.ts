import { Component } from '@angular/core';
import {CreditCardCreator} from './credit-card-creator/credit-card-creator';

@Component({
  selector: 'app-add-credit-card',
  standalone: true,
  imports: [
    CreditCardCreator
  ],
  templateUrl: './add-credit-card.html',
  styleUrl: './add-credit-card.css'
})
export class AddCreditCard {

}

import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {CreateCreditCardModal} from './create-credit-card-modal/create-credit-card-modal';

@Component({
  selector: 'app-credit-card-creator',
  imports: [
    MatIconModule
  ],
  standalone: true,
  templateUrl: './credit-card-creator.html',
  styleUrl: './credit-card-creator.css'
})
export class CreditCardCreator {
  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateCreditCardModal, {
      disableClose: true
    });
  }
}

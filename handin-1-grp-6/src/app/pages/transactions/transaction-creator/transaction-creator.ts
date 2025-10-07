import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {CreateTransactionModal} from './create-transaction-modal/create-transaction-modal';

@Component({
  selector: 'app-transaction-creator',
  imports: [
    MatIconModule
  ],
  templateUrl: './transaction-creator.html',
})
export class TransactionCreator {
  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateTransactionModal, {
      disableClose: true
    });
  }
}

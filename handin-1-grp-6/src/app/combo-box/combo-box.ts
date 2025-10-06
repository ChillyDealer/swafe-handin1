import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-combo-box',
  imports: [],
  templateUrl: './combo-box.html',
  styleUrl: './combo-box.css'
})
export class ComboBox {
  formBuilder = inject(FormBuilder);

  cardNumberFilter = this.formBuilder.nonNullable.group({
    cardNumber: ['']
  });
}

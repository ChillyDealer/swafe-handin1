import {Component, Input} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  imports: [],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css'
})
export class FormField implements ControlValueAccessor{
  @Input({required: true}) label!: string;

  writeValue(obj: any): void {
      throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
      throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
      throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
      throw new Error("Method not implemented.");
  }
}

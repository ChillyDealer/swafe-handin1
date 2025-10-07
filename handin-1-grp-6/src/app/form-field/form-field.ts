import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule

@Component({
  selector: 'app-form-field',
  standalone: true, // <-- This tells us it's a standalone component
  imports: [
    CommonModule,  // <-- Add CommonModule here
    FormsModule    // <-- Add FormsModule for ngModel
  ],
  templateUrl: './form-field.html', // The name in your code was form-field.html
  styleUrl: './form-field.css',     // The name in your code was form-field.css
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormField), // Use the correct class name
      multi: true
    }
  ]
})
export class FormField implements ControlValueAccessor {
  @Input({ required: true }) label!: string;

  // --- Implementation for ControlValueAccessor ---
  value: any = '';
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(newValue: any) {
    this.value = newValue;
    this.onChange(this.value);
    this.onTouched();
  }
}

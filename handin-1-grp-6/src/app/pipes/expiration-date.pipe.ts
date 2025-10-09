import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expirationDate',
  standalone: true
})
export class ExpirationDatePipe implements PipeTransform {
  
  transform(month: number, year: number): string {
    const formattedMonth = month.toString().padStart(2, '0');
    
    return `${formattedMonth}/${year}`;
  }
}
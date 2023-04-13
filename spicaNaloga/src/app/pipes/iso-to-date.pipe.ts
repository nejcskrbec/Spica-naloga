import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({name: 'isoToDate'})
export class IsoToDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    return formatDate(date, 'dd. MM. yyyy', 'en-US');
  }
}

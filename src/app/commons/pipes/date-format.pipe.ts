import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(ms: number): string {
    const dateMS = new Date(ms);
    const day = dateMS.getDate().toString().padStart(2, '0');
    const month = (dateMS.getMonth() + 1).toString().padStart(2, '0');
    const uear = dateMS.getFullYear();

    return `${day}/${month}/${uear}`;
  }
}
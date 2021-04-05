import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lira'
})
export class LiraPipe implements PipeTransform {

  transform(value: number): any {
    return value + " ₺"
  }

}

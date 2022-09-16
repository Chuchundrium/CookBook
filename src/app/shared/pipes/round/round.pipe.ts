import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number, roundTo = 0): number {
    const k = 10 ** roundTo;
    return Math.round(value * k) / k;
  }

}

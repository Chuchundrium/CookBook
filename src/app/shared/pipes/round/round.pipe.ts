import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number, roundTo = 0): number {
    // TODO: add 'isInPieces' and roundTo 0, if true
    if (value < 10 && value > 1 && !roundTo) {
      roundTo = 1;
    }
    if (value < 1 && !roundTo) {
      roundTo = 2;
    }

    const k = 10 ** roundTo;
    return Math.round(value * k) / k;
  }

}

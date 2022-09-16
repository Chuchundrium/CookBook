import { Pipe, PipeTransform } from '@angular/core';
const SPLIT_SEPARATOR = '\\n';

@Pipe({
  name: 'severalLines'
})
export class SeveralLinesPipe implements PipeTransform {

  transform(value: string): string[] {
    return value ? value.split(SPLIT_SEPARATOR) : [];
  }

}

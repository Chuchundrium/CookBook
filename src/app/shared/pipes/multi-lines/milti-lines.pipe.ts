import { Pipe, PipeTransform } from '@angular/core';
const LINE_SEPARATOR: Readonly<string> = '\\n';

@Pipe({
  name: 'multiLines'
})
export class MultiLinesPipe implements PipeTransform {

  transform(value: string, separator: string = LINE_SEPARATOR): string[] {
    return value ? value.split(separator) : [];
  }

}

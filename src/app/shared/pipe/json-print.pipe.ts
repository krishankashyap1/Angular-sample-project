import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'jsonprint'
  })
  export class JsonPrintPipe implements PipeTransform {
    transform(val) {
      if (val === undefined) {
        return null
      }
      return JSON.stringify(val, null, 2)
         .replace(/ /g, '&nbsp;')
         .replace(/\n/g, '<br/>');
    }
  }
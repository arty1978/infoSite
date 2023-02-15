import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(arr: any[], searchVal: string): any[] {
    if (!arr) {
      return [];
    }
    if (!searchVal) {
      return arr;
    }

    return arr.filter(obj => {
      for (const key in obj) {
        if (!obj[key]) {continue;}
        const val = obj[key].toString().toLowerCase().trim();
        if (val.includes(searchVal.toLowerCase().trim())) {
          return true;
        }
      }
      return false
    });
  }
}
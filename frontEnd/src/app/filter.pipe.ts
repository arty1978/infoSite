import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0) {
      return value;
    }
    for (const item of value) {
      const resArray = [];
      if (item[propName] === filterString) {
        resArray.push(item);
      }
      return resArray;
    }
  }
}

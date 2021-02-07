import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTitlecase'
})
export class CustomTitlecasePipe implements PipeTransform {
  constructor(private titlecase: TitleCasePipe) {}

  transform(value: string): string {
    // If it is a robot, make title case as uppercase
    if (value.includes('-')) {
      return value.toUpperCase();
    }

    return this.titlecase.transform(value);
  }
}

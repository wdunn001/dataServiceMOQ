import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackBy',
  pure: true
})
export class TrackByPipe implements PipeTransform {

  transform(option: string): Function {
    return (index: number, item: any) => item[option];
  }

}

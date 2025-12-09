import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CursorPipe implements PipeTransform {
  transform(cursor: string, _metadata: ArgumentMetadata) { //eslint-disable-line
    if (cursor === 'null' || cursor === '') {
      return null;
    }
    return cursor;
  }
}

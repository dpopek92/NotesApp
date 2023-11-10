import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types, isValidObjectId } from 'mongoose';

@Injectable()
export class ValidateMongoIdParam implements PipeTransform<string> {
  transform(value: string): string {
    if (isValidObjectId(value)) {
      if (new Types.ObjectId(value).toString() === value) return value;
      throw new BadRequestException('Param is not valid');
    }
    throw new BadRequestException('Param is not valid');
  }
}

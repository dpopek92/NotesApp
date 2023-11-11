import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types, isValidObjectId } from 'mongoose';

// Pipe for validating proper mongoId param
@Injectable()
export class ValidateMongoIdParam implements PipeTransform<string> {
  transform(value: string): string {
    if (
      isValidObjectId(value) &&
      new Types.ObjectId(value).toString() === value
    ) {
      return value;
    }
    throw new BadRequestException(`Invalid MongoDB ObjectId: ${value}`);
  }
}

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
    /* 
    any HTTP request from the frontend of this application 
    with a postID that can’t be found in the database will be regarded as invalid.
    */
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        
        if (!isValid) throw new BadRequestException('Invalid ID!');

        return value;
    }
}
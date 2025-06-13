import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class DeleteCommentCommand {
  constructor(partial?: Partial<DeleteCommentCommand>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(DeleteCommentCommand, partial, { excludeExtraneousValues: true }));
    }
  }

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
} 
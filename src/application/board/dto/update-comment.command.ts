import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class UpdateCommentCommand {
  constructor(partial?: Partial<UpdateCommentCommand>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(UpdateCommentCommand, partial, { excludeExtraneousValues: true }));
    }
  }

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  id: number;

  @IsNotEmpty()
  @Expose()
  content: any;

  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
} 
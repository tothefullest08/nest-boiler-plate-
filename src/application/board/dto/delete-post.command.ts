import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class DeletePostCommand {
  constructor(partial?: Partial<DeletePostCommand>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(DeletePostCommand, partial, { excludeExtraneousValues: true }));
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
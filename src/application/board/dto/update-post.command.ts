import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class UpdatePostCommand {
  constructor(partial?: Partial<UpdatePostCommand>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(UpdatePostCommand, partial, { excludeExtraneousValues: true }));
    }
  }

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  title: string;

  @IsNotEmpty()
  @Expose()
  content: any;

  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
} 
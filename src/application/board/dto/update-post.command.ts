import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';

export class UpdatePostCommand {
  constructor(partial: Partial<UpdatePostCommand>) {
    const validated = plainToClassWithValidation(UpdatePostCommand, partial, { excludeExtraneousValues: true });
    Object.assign(this, validated);
  }

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: any;

  @IsString()
  @IsNotEmpty()
  password: string;
} 
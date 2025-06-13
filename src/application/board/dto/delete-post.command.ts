import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';

export class DeletePostCommand {
  constructor(partial: Partial<DeletePostCommand>) {
    const validated = plainToClassWithValidation(DeletePostCommand, partial, { excludeExtraneousValues: true });
    Object.assign(this, validated);
  }

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  password: string;
} 
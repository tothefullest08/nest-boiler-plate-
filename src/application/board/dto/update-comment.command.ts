import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';

export class UpdateCommentCommand {
  constructor(partial: Partial<UpdateCommentCommand>) {
    const validated = plainToClassWithValidation(UpdateCommentCommand, partial, { excludeExtraneousValues: true });
    Object.assign(this, validated);
  }

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  content: any;

  @IsString()
  @IsNotEmpty()
  password: string;
} 
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';

export class DeleteCommentCommand {
  constructor(partial: Partial<DeleteCommentCommand>) {
    const validated = plainToClassWithValidation(DeleteCommentCommand, partial, { excludeExtraneousValues: true });
    Object.assign(this, validated);
  }

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  password: string;
} 
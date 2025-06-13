import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';

export class CreateCommentCommand {
  constructor(partial: Partial<CreateCommentCommand>) {
    const validated = plainToClassWithValidation(CreateCommentCommand, partial, { excludeExtraneousValues: true });
    Object.assign(this, validated);
  }

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  content: any;

  @IsString()
  @IsNotEmpty()
  authorName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
} 
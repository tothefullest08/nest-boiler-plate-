import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class CreateCommentCommand {
  constructor(partial?: Partial<CreateCommentCommand>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(CreateCommentCommand, partial, { excludeExtraneousValues: true }));
    }
  }

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  postId: number;

  @IsNotEmpty()
  @Expose()
  content: any;

  @IsString()
  @IsNotEmpty()
  @Expose()
  authorName: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  parentId?: number;
} 
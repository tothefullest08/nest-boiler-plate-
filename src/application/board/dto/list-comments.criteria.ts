import { IsNumber, IsOptional } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';

export class ListCommentsCriteria {
  constructor(partial: Partial<ListCommentsCriteria>) {
    const validated = plainToClassWithValidation(ListCommentsCriteria, partial, { excludeExtraneousValues: true });
    Object.assign(this, validated);
  }

  @IsNumber()
  postId: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @IsNumber()
  parentId?: number;
} 
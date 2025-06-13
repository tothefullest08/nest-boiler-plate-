import { IsNumber, IsOptional } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class ListCommentsCriteria {
  constructor(partial?: Partial<ListCommentsCriteria>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(ListCommentsCriteria, partial, { excludeExtraneousValues: true }));
    }
  }

  @IsNumber()
  @Expose()
  postId: number;

  @IsOptional()
  @IsNumber()
  @Expose()
  page?: number;

  @IsOptional()
  @IsNumber()
  @Expose()
  pageSize?: number;

  @IsOptional()
  @IsNumber()
  @Expose()
  parentId?: number;
} 
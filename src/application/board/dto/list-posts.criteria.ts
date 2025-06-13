import { IsOptional, IsString, IsNumber } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';

export class ListPostsCriteria {
  constructor(partial: Partial<ListPostsCriteria>) {
    const validated = plainToClassWithValidation(ListPostsCriteria, partial, { excludeExtraneousValues: true });
    Object.assign(this, validated);
  }

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @IsString()
  searchTitle?: string;

  @IsOptional()
  @IsString()
  searchAuthor?: string;
} 
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class ListPostsCriteria {
  constructor(partial?: Partial<ListPostsCriteria>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(ListPostsCriteria, partial, { excludeExtraneousValues: true }));
    }
  }

  @IsOptional()
  @IsNumber()
  @Expose()
  page?: number;

  @IsOptional()
  @IsNumber()
  @Expose()
  pageSize?: number;

  @IsOptional()
  @IsString()
  @Expose()
  searchTitle?: string;

  @IsOptional()
  @IsString()
  @Expose()
  searchAuthor?: string;
}

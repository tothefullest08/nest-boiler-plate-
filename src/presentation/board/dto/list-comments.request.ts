import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class ListCommentsRequest {
  constructor(partial?: Partial<ListCommentsRequest>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(ListCommentsRequest, partial, { excludeExtraneousValues: true }));
    }
  }

  @ApiPropertyOptional({ description: '페이지 번호', default: 1, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Expose()
  page?: number = 1;

  @ApiPropertyOptional({ description: '페이지 크기', default: 10, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Expose()
  pageSize?: number = 10;

  @ApiPropertyOptional({ description: '부모 댓글 ID (이 값이 없으면 최상위 댓글만 조회)', type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Expose()
  parentId?: number;
} 
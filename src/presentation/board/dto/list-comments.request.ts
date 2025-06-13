import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class ListCommentsRequest {
  @ApiPropertyOptional({ description: '페이지 번호', default: 1, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: '페이지 크기', default: 10, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize?: number = 10;

  @ApiPropertyOptional({ description: '부모 댓글 ID (이 값이 없으면 최상위 댓글만 조회)', type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  parentId?: number;
} 
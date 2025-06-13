import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class ListPostsRequest {
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

  @ApiPropertyOptional({ description: '제목 검색어' })
  @IsOptional()
  @IsString()
  @Expose()
  searchTitle?: string;

  @ApiPropertyOptional({ description: '작성자 검색어' })
  @IsOptional()
  @IsString()
  @Expose()
  searchAuthor?: string;
} 
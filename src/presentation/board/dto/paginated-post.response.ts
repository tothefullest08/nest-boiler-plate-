import { ApiProperty } from '@nestjs/swagger';
import { PostResponse } from '@presentation/board/dto/post.response';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

export class PaginatedPostResponse {
  constructor(partial?: Partial<PaginatedPostResponse>) {
    if (partial) {
      const validated = plainToClassWithValidation(PaginatedPostResponse, partial, { excludeExtraneousValues: true });
      Object.assign(this, validated);
    }
  }

  @ApiProperty({ type: [PostResponse], description: '게시글 목록' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostResponse)
  @Expose()
  data: PostResponse[];

  @ApiProperty({ description: '총 게시글 수' })
  @IsNumber()
  @Expose()
  total: number;

  @ApiProperty({ description: '현재 페이지' })
  @IsNumber()
  @Expose()
  page: number;

  @ApiProperty({ description: '페이지 당 항목 수' })
  @IsNumber()
  @Expose()
  pageSize: number;
} 
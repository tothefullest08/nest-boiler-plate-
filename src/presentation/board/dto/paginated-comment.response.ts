import { ApiProperty } from '@nestjs/swagger';
import { CommentResponse } from '@presentation/board/dto/comment.response';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

export class PaginatedCommentResponse {
  constructor(partial?: Partial<PaginatedCommentResponse>) {
    if (partial) {
      const validated = plainToClassWithValidation(PaginatedCommentResponse, partial, { excludeExtraneousValues: true });
      Object.assign(this, validated);
    }
  }

  @ApiProperty({ type: [CommentResponse], description: '댓글 목록' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentResponse)
  @Expose()
  data: CommentResponse[];

  @ApiProperty({ description: '총 댓글 수' })
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
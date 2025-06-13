import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose, Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsOptional, IsArray, ValidateNested } from 'class-validator';

export class CommentResponse {
  constructor(partial: Partial<CommentResponse>) {
    Object.assign(
      this,
      plainToClassWithValidation(CommentResponse, partial, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @ApiProperty({ description: '댓글 ID' })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '게시글 ID' })
  @IsNumber()
  @Expose()
  postId: number;

  @ApiPropertyOptional({ description: '부모 댓글 ID', nullable: true })
  @IsOptional()
  @IsNumber()
  @Expose()
  parentId?: number;

  @ApiProperty({ description: '내용' })
  @Expose()
  content: any;

  @ApiProperty({ description: '작성자 이름' })
  @IsString()
  @Expose()
  authorName: string;

  @ApiProperty({ description: '생성일' })
  @IsDate()
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: '수정일' })
  @IsDate()
  @Expose()
  updatedAt: Date;

  @ApiProperty({ type: () => [CommentResponse], description: '대댓글 목록' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentResponse)
  @Expose()
  children: CommentResponse[];
}

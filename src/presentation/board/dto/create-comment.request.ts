import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateCommentRequest {
  @ApiProperty({ description: '댓글 내용', example: { body: '이것은 댓글 내용입니다.' } })
  @IsNotEmpty()
  @Expose()
  content: any;

  @ApiProperty({ description: '작성자 이름', example: '김댓글' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  authorName: string;

  @ApiProperty({ description: '비밀번호', example: 'commentPass' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;

  @ApiPropertyOptional({ description: '부모 댓글 ID', type: Number })
  @IsOptional()
  @IsNumber()
  @Expose()
  parentId?: number;
}

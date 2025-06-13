import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentRequest {
  @ApiProperty({ description: '댓글 내용', example: { body: '수정된 댓글 내용입니다.' } })
  @IsNotEmpty()
  content: any;

  @ApiProperty({ description: '비밀번호', example: 'commentPass' })
  @IsString()
  @IsNotEmpty()
  password: string;
} 
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdatePostRequest {
  @ApiProperty({ description: '제목', example: '수정된 게시글 제목' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  title: string;

  @ApiProperty({ description: '내용', example: { body: '수정된 내용입니다.' } })
  @IsNotEmpty()
  @Expose()
  content: any;

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
} 
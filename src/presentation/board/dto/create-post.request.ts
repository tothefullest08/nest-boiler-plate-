import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreatePostRequest {
  @ApiProperty({ description: '제목', example: '새로운 게시글 제목' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  title: string;

  @ApiProperty({ description: '내용', example: { body: '게시글 내용' } })
  @IsNotEmpty()
  @Expose()
  content: any;

  @ApiProperty({ description: '작성자 이름', example: '홍길동' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  authorName: string;

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostRequest {
  @ApiProperty({ description: '제목', example: '새로운 게시글 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '내용', example: { body: '게시글 내용' } })
  @IsNotEmpty()
  content: any;

  @ApiProperty({ description: '작성자 이름', example: '홍길동' })
  @IsString()
  @IsNotEmpty()
  authorName: string;

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';
import { IsString, IsNumber, IsDate } from 'class-validator';

export class PostResponse {
  constructor(partial?: Partial<PostResponse>) {
    if (partial) {
      Object.assign(
        this,
        plainToClassWithValidation(PostResponse, partial, {
          excludeExtraneousValues: true,
        }),
      );
    }
  }

  @ApiProperty({ description: '게시글 ID' })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '제목' })
  @IsString()
  @Expose()
  title: string;

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

  // @ApiProperty({ type: () => [CommentResponse], description: '댓글 목록' })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Expose()
  // comments: CommentResponse[];
}

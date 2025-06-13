import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class UpdateCommentRequest {
  constructor(partial?: Partial<UpdateCommentRequest>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(UpdateCommentRequest, partial, { excludeExtraneousValues: true }));
    }
  }

  @ApiProperty({ description: '댓글 내용', example: { body: '수정된 댓글 내용입니다.' } })
  @IsNotEmpty()
  @Expose()
  content: any;

  @ApiProperty({ description: '비밀번호', example: 'commentPass' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
} 
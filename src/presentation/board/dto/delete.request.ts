import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class DeleteRequest {
  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;

  constructor(partial?: Partial<DeleteRequest>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(DeleteRequest, partial, { excludeExtraneousValues: true }));
    }
  }
} 
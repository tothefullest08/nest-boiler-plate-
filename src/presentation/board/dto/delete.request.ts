import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteRequest {
  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
} 
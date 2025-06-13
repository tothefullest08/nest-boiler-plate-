import { IsString, IsNotEmpty } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';

export class CreatePostCommand {
  constructor(partial: Partial<CreatePostCommand>) {
    const validated = plainToClassWithValidation(CreatePostCommand, partial, { excludeExtraneousValues: true });
    Object.assign(this, validated);
  }

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: any;

  @IsString()
  @IsNotEmpty()
  authorName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
} 
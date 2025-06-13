import { IsString, IsNotEmpty } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class CreatePostCommand {
  constructor(partial?: Partial<CreatePostCommand>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(CreatePostCommand, partial, { excludeExtraneousValues: true }));
    }
  }

  @IsString()
  @IsNotEmpty()
  @Expose()
  title: string;

  @IsNotEmpty()
  @Expose()
  content: any;

  @IsString()
  @IsNotEmpty()
  @Expose()
  authorName: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
} 
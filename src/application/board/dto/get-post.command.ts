import { IsNumber, IsNotEmpty } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';

export class GetPostCommand {
  constructor(partial: Partial<GetPostCommand>) {
    const validated = plainToClassWithValidation(GetPostCommand, partial, { excludeExtraneousValues: true });
    Object.assign(this, validated);
  }

  @IsNumber()
  @IsNotEmpty()
  id: number;
} 
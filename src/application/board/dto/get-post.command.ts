import { IsNumber, IsNotEmpty } from 'class-validator';
import { plainToClassWithValidation } from '@common/util/util';
import { Expose } from 'class-transformer';

export class GetPostCommand {
  constructor(partial?: Partial<GetPostCommand>) {
    if (partial) {
      Object.assign(this, plainToClassWithValidation(GetPostCommand, partial, { excludeExtraneousValues: true }));
    }
  }

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  id: number;
} 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from '@common/database/typeorm.config.serivce';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeORMConfig,
    }),
  ],
  providers: [TypeORMConfig],
})
export class TypeORMModule {}

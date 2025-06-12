import { DataMartTypeOrmConfigService } from '@common/database/typeorm/datamart.typeorm.config.service';
import { DataMart2TypeOrmConfigService } from '@common/database/typeorm/datamart2.typeorm.config.service';
import { ReadOnlyDatabaseConfigService } from '@common/database/typeorm/read-only-database-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './typeorm.config.serivce';

export const DATA_MART_DATASOURCE = 'datamart';
export const DATA_MART_2_DATASOURCE = 'datamart2';
export const READ_ONLY_DATASOURCE = 'readonly';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeORMConfig,
    }),
    TypeOrmModule.forRootAsync({ name: DATA_MART_DATASOURCE, useClass: DataMartTypeOrmConfigService }),
    TypeOrmModule.forRootAsync({ name: READ_ONLY_DATASOURCE, useClass: ReadOnlyDatabaseConfigService }),
    TypeOrmModule.forRootAsync({ name: DATA_MART_2_DATASOURCE, useClass: DataMart2TypeOrmConfigService }),
  ],
  providers: [TypeORMConfig, DataMartTypeOrmConfigService, ReadOnlyDatabaseConfigService, DataMart2TypeOrmConfigService],
})
export class TypeORMModule {}

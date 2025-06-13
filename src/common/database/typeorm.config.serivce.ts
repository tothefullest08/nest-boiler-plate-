import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { NODE_ENV } from '@common/enum/config.enum';

@Injectable()
export class TypeORMConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const node_env: string = this.configService.get<string>('NODE_ENV');

    const host = this.configService.get('DB_HOST') || 'localhost';
    const port = this.configService.get('DB_PORT') || '3309';
    const username = this.configService.get('DB_USERNAME') || 'test';
    const password = this.configService.get('DB_PASSWORD') || 'test';
    const database = this.configService.get('DB_DATABASE') || 'test';
    const synchronize = false;
    const isLocal: boolean = node_env === NODE_ENV.LOCAL;

    return {
      type: 'mysql',
      host,
      port,
      username,
      password,
      database,
      logging: isLocal ? ['query', 'schema', 'error', 'warn', 'info', 'log', 'migration'] : false,
      // 테이블명, 필드명을 어떤 형식으로 생성할지 알려줍니다.
      synchronize,
    };
  }
}

import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { NODE_ENV } from '@src/common/enums';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeORMConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const node_env: string = this.configService.get<string>('NODE_ENV');

    const host = this.configService.get('DB_HOST') || 'localhost';
    const port = this.configService.get('DB_PORT') || '3306';
    const username = this.configService.get('DB_USERNAME') || '';
    const password = this.configService.get('DB_PASSWORD') || '';
    const database = this.configService.get('DB_DATABASE') || 'test';
    const synchronize = false;
    const entities = node_env === NODE_ENV.TEST ? ['src/**/!(*datamart*)/*.{dao,entity}.{js,ts}'] : ['dist/**/!(*datamart*)/*.{dao,entity}.{js,ts}'];
    const charset = 'utf8mb4';
    const maxConnection = this.configService.get('TYPEORM_MAX_CONNECTION') || 50;
    const k8s_redis_cluster_host = this.configService.get('K8S_REDIS_CLUSTER_HOST');
    const k8s_redis_cluster_port = this.configService.get('K8S_REDIS_CLUSTER_PORT') ?? 6379;
    const cache = this.configService.get('TYPEORM_CACHE')
      ? {
          type: 'ioredis/cluster' as const,
          options: {
            startupNodes: [{ host: k8s_redis_cluster_host, port: k8s_redis_cluster_port }],
            options: {
              redisOptions: {
                connectTimeout: 10000,
                maxRetriesPerRequest: 1,
                commandTimeout: 1500,
                enableAutoPipelining: true,
              },
            },
          },
          ignoreErrors: true,
        }
      : false;

    const isLocal: boolean = node_env === NODE_ENV.LOCAL;

    return {
      type: 'mysql',
      host,
      port,
      username,
      password,
      database,
      logging: isLocal ? ['query', 'schema', 'error', 'warn', 'info', 'log', 'migration'] : false,
      // logging: ['error', 'warn'],
      entities,
      // 테이블명, 필드명을 어떤 형식으로 생성할지 알려줍니다.
      namingStrategy: new SnakeNamingStrategy(),
      synchronize,
      charset,
      cache,
      extra: {
        connectionLimit: maxConnection,
        idleTimeout: 60 * 1000,
        maxIdle: 0,
      },
    };
  }
}

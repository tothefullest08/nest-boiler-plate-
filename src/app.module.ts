import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BoardPresentationModule } from '@presentation/board/board.presentation.module';
import { TypeORMModule } from '@common/database/typeorm.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        quietReqLogger: true,
        autoLogging: true,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    TypeORMModule,
    BoardPresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

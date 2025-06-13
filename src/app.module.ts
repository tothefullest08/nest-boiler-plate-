import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BoardPresentationModule } from '@presentation/board/board.presentation.module';
import { TypeORMModule } from '@common/database/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeORMModule,
    BoardPresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

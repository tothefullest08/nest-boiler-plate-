import { Module } from '@nestjs/common';
import { BoardApplicationModule } from '@application/board/board.application.module';
import { BoardController } from '@presentation/board/controller/board.controller';

@Module({
  imports: [BoardApplicationModule],
  controllers: [BoardController],
})
export class BoardPresentationModule {}

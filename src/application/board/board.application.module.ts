import { Module } from '@nestjs/common';
import { BoardService } from '@application/board/service/board.service';
import { BoardInfrastructureModule } from '@infrastructure/board/board.infrastructure.module';

@Module({
  imports: [BoardInfrastructureModule],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardApplicationModule {}

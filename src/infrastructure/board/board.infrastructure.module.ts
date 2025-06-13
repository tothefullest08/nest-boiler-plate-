import { Module } from '@nestjs/common';
import { CommentRepositoryImpl } from '@infrastructure/board/repository/comment.repository.impl';
import { PostRepositoryImpl } from '@infrastructure/board/repository/post.repository.impl';
import { KeywordNotificationRepositoryImpl } from '@infrastructure/board/repository/keyword-notification.repository.impl';

const commentRepoProvider = {
  provide: 'CommentRepository',
  useClass: CommentRepositoryImpl,
};

const postRepoProvider = {
  provide: 'PostRepository',
  useClass: PostRepositoryImpl,
};

const keywordNotificationRepoProvider = {
  provide: 'KeywordNotificationRepository',
  useClass: KeywordNotificationRepositoryImpl,
};

@Module({
  providers: [commentRepoProvider, postRepoProvider, keywordNotificationRepoProvider],
  exports: [commentRepoProvider, postRepoProvider, keywordNotificationRepoProvider],
})
export class BoardInfrastructureModule {}

import { Module } from '@nestjs/common';
import { CommentRepositoryImpl } from '@infrastructure/board/repository/comment.repository.impl';
import { PostRepositoryImpl } from '@infrastructure/board/repository/post.repository.impl';

const commentRepoProvider = {
  provide: 'CommentRepository',
  useClass: CommentRepositoryImpl,
};

const postRepoProvider = {
  provide: 'PostRepository',
  useClass: PostRepositoryImpl,
};

@Module({
  providers: [commentRepoProvider, postRepoProvider],
  exports: [commentRepoProvider, postRepoProvider],
})
export class BoardInfrastructureModule {}

import { Comment } from '@domain/board/entity/comment.entity';
import { EntityManager } from 'typeorm';

export interface CommentRepository {
  save(comment: Comment, _entityManager?: EntityManager): Promise<Comment>;
  findById(id: number, _entityManager?: EntityManager): Promise<Comment | null>;
  findByPostId(
    postId: number,
    options?: {
      page?: number;
      pageSize?: number;
      parentId?: number | null;
    },
    _entityManager?: EntityManager,
  ): Promise<{ data: Comment[]; total: number }>;
  softDelete(id: number, _entityManager?: EntityManager): Promise<void>;
  // 대댓글 트리 조회
  findTreeByPostId(postId: number, _entityManager?: EntityManager): Promise<Comment[]>;
}

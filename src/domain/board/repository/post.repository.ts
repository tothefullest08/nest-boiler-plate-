import { Post } from '@domain/board/entity/post.entity';
import { EntityManager } from 'typeorm';

export interface PostRepository {
  save(post: Post, _entityManager?: EntityManager): Promise<Post>;
  findById(id: number, _entityManager?: EntityManager): Promise<Post | null>;
  findAll(
    options?: { page?: number; pageSize?: number; searchTitle?: string; searchAuthor?: string },
    _entityManager?: EntityManager,
  ): Promise<{ data: Post[]; total: number }>;
  softDelete(id: number, _entityManager?: EntityManager): Promise<void>;
}

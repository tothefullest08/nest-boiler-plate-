import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, FindOptionsWhere } from 'typeorm';
import { Post } from '@domain/board/entity/post.entity';
import { PostRepository } from '@domain/board/repository/post.repository';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(private dataSource: DataSource) {}

  async save(post: Post, _entityManager?: EntityManager): Promise<Post> {
    const entityManager = _entityManager ?? this.dataSource.manager;
    return entityManager.getRepository(Post).save(post);
  }

  async findById(id: number, _entityManager?: EntityManager): Promise<Post | null> {
    const entityManager = _entityManager ?? this.dataSource.manager;
    return entityManager.getRepository(Post).findOne({
      where: { id },
    });
  }

  async findAll(
    options?: { page?: number; pageSize?: number; searchTitle?: string; searchAuthor?: string },
    _entityManager?: EntityManager,
  ): Promise<{ data: Post[]; total: number }> {
    const entityManager = _entityManager ?? this.dataSource.manager;
    const { page = 1, pageSize = 10, searchTitle, searchAuthor } = options || {};
    const where: FindOptionsWhere<Post> = {};
    if (searchTitle) where.title = searchTitle;
    if (searchAuthor) where.authorName = searchAuthor;

    const [data, total] = await entityManager.getRepository(Post).findAndCount({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { id: 'DESC' },
    });
    return { data, total };
  }

  async softDelete(id: number, _entityManager?: EntityManager): Promise<void> {
    const entityManager = _entityManager ?? this.dataSource.manager;
    await entityManager.getRepository(Post).softDelete(id);
  }
}

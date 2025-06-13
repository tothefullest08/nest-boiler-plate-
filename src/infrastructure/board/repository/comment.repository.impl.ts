import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, FindOptionsWhere } from 'typeorm';
import { Comment } from '@domain/board/entity/comment.entity';
import { CommentRepository } from '@domain/board/repository/comment.repository';

@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
  constructor(private dataSource: DataSource) {}

  async save(comment: Comment, _entityManager: EntityManager): Promise<Comment> {
    const entityManager = _entityManager ?? this.dataSource.manager;

    return entityManager.getRepository(Comment).save(comment);
  }

  async findById(id: number, _entityManager?: EntityManager): Promise<Comment | null> {
    const entityManager = _entityManager ?? this.dataSource.manager;

    return entityManager.getRepository(Comment).findOne({
      where: { id },
      relations: {
        children: true,
        parent: true,
      },
    });
  }

  async findByPostId(
    postId: number,
    options?: { page?: number; pageSize?: number; parentId?: number | null },
    _entityManager?: EntityManager,
  ): Promise<{ data: Comment[]; total: number }> {
    const entityManager = _entityManager ?? this.dataSource.manager;

    const { page = 1, pageSize = 10, parentId = null } = options || {};
    const where: FindOptionsWhere<Comment> = { postId };
    if (parentId !== undefined) where.parentId = parentId;

    const [data, total] = await entityManager.getRepository(Comment).findAndCount({
      where,
      relations: {
        children: true,
        parent: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { id: 'ASC' },
    });
    return { data, total };
  }

  async softDelete(id: number, _entityManager: EntityManager): Promise<void> {
    const entityManager = _entityManager ?? this.dataSource.manager;

    await entityManager.getRepository(Comment).softDelete(id);
  }

  async findTreeByPostId(postId: number, _entityManager: EntityManager): Promise<Comment[]> {
    const entityManager = _entityManager ?? this.dataSource.manager;

    // 트리 구조로 전체 댓글 조회 (최상위 댓글만 반환, children 포함)
    return entityManager.getRepository(Comment).find({
      where: { postId, parentId: null },
      relations: ['children'],
      order: { id: 'ASC' },
    });
  }
}

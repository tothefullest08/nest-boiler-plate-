import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AggregateRootEntity } from '@common/entity/sub-domain.entity';
import { Logger } from '@nestjs/common';
import { InternalException } from '@common/exception/internal.exception';
import { ErrorTypeEnum } from '@common/exception/error.enum';

@Entity('comment')
export class Comment extends AggregateRootEntity {
  constructor(postId: number, content: any, authorName: string, password: string, parentId?: number) {
    super();
    this.postId = postId;
    this.content = content;
    this.authorName = authorName;
    this.password = password;
    this.parentId = parentId;
    this.logger = new Logger(Comment.name);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false, name: 'post_id' })
  postId: number;

  @Column({ type: 'int', nullable: true, name: 'parent_id' })
  parentId?: number;

  @Column({ type: 'json', nullable: false })
  content: any;

  @Column({ type: 'varchar', length: 64, nullable: false, name: 'author_name' })
  authorName: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'password' })
  password: string;

  @ManyToOne(() => Comment, (comment) => comment.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];

  private readonly logger: Logger;

  update(content: any, password: string, compareFn: (plain: string, hash: string) => boolean) {
    if (!compareFn(password, this.password)) {
      this.logger.error(`댓글 수정 실패: 비밀번호 불일치 (commentId: ${this.id})`);
      throw new InternalException(ErrorTypeEnum.UNAUTHORIZED_ERROR, '비밀번호가 일치하지 않습니다');
    }
    this.content = content;
  }

  softDelete(password: string, compareFn: (plain: string, hash: string) => boolean) {
    if (!compareFn(password, this.password)) {
      this.logger.error(`댓글 삭제 실패: 비밀번호 불일치 (commentId: ${this.id})`);
      throw new InternalException(ErrorTypeEnum.UNAUTHORIZED_ERROR, '비밀번호가 일치하지 않습니다');
    }
    this.deletedAt = new Date();
  }

  isDeleted(): boolean {
    return !!this.deletedAt;
  }
}

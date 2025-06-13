import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Logger } from '@nestjs/common';
import { InternalException } from '@common/exception/internal.exception';
import { ErrorTypeEnum } from '@common/exception/error.enum';
import { AggregateRootEntity } from '@common/entity/aggregate-root.entity';

@Entity('post')
export class Post extends AggregateRootEntity {
  constructor(title: string, content: any, authorName: string, password: string) {
    super();
    this.title = title;
    this.content = content;
    this.authorName = authorName;
    this.password = password;
    this.logger = new Logger(Post.name);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'json', nullable: false })
  content: any;

  @Column({ type: 'varchar', length: 64, nullable: false, name: 'author_name' })
  authorName: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'password' })
  password: string;

  private readonly logger: Logger;

  update(title: string, content: any, password: string, compareFn: (plain: string, hash: string) => boolean) {
    if (!compareFn(password, this.password)) {
      this.logger.error(`게시글 수정 실패: 비밀번호 불일치 (postId: ${this.id})`);
      throw new InternalException(ErrorTypeEnum.UNAUTHORIZED_ERROR, '비밀번호가 일치하지 않습니다');
    }
    this.title = title;
    this.content = content;
  }

  softDelete(password: string, compareFn: (plain: string, hash: string) => boolean) {
    if (!compareFn(password, this.password)) {
      this.logger.error(`게시글 삭제 실패: 비밀번호 불일치 (postId: ${this.id})`);
      throw new InternalException(ErrorTypeEnum.UNAUTHORIZED_ERROR, '비밀번호가 일치하지 않습니다');
    }
    this.deletedAt = new Date();
  }

  isDeleted(): boolean {
    return !!this.deletedAt;
  }
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { AggregateRootEntity } from '@common/entity/sub-domain.entity';

@Entity('comment')
export class Comment extends AggregateRootEntity {
  constructor(postId: number, content: any, authorName: string, password: string, parentId?: number) {
    super();
    this.postId = postId;
    this.content = content;
    this.authorName = authorName;
    this.password = password;
    this.parentId = parentId;
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

  @ManyToOne(() => Comment, (comment) => comment.children, { nullable: true })
  parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];

  update(content: any, password: string, hashFn: (pw: string) => string) {
    if (!this.verifyPassword(password, hashFn)) {
      throw new Error('비밀번호가 일치하지 않습니다');
    }
    this.content = content;
  }

  softDelete(password: string, hashFn: (pw: string) => string) {
    if (!this.verifyPassword(password, hashFn)) {
      throw new Error('비밀번호가 일치하지 않습니다');
    }
    this.deletedAt = new Date();
  }

  verifyPassword(password: string, hashFn: (pw: string) => string): boolean {
    return this.password === hashFn(password);
  }

  isDeleted(): boolean {
    return !!this.deletedAt;
  }

  addChild(comment: Comment) {
    if (!this.children) this.children = [];
    this.children.push(comment);
  }
}

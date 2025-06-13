import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AggregateRootEntity } from '@common/entity/sub-domain.entity';

@Entity('post')
export class Post extends AggregateRootEntity {
  constructor(title: string, content: any, authorName: string, password: string) {
    super();
    this.title = title;
    this.content = content;
    this.authorName = authorName;
    this.password = password;
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

  update(title: string, content: any, password: string, hashFn: (pw: string) => string) {
    if (!this.verifyPassword(password, hashFn)) {
      throw new Error('비밀번호가 일치하지 않습니다');
    }
    this.title = title;
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
}

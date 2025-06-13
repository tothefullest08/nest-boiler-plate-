import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AggregateRootEntity } from '@common/entity/aggregate-root.entity';

@Entity('keyword_notification')
export class KeywordNotification extends AggregateRootEntity {
  constructor(authorName: string, keyword: string) {
    super();
    this.authorName = authorName;
    this.keyword = keyword;
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'author_name', type: 'varchar', length: 64 })
  authorName: string;

  @Column({ type: 'varchar', length: 64 })
  keyword: string;
}

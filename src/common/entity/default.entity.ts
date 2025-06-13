import { BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class DefaultEntity extends BaseEntity {
  @Expose()
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Expose()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Expose()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

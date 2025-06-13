import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreatePostComment1749792285304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'post',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'title', type: 'varchar', length: '255', isNullable: false },
          { name: 'content', type: 'json', isNullable: false },
          { name: 'author_name', type: 'varchar', length: '64', isNullable: false },
          { name: 'password', type: 'varchar', length: '255', isNullable: false },
          { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          { name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
          { name: 'deleted_at', type: 'datetime', isNullable: true },
        ],
      }),
    );

    await queryRunner.createIndex('post', new TableIndex({ name: 'IDX_post_title', columnNames: ['title'] }));
    await queryRunner.createIndex('post', new TableIndex({ name: 'IDX_post_author_name', columnNames: ['author_name'] }));

    await queryRunner.createTable(
      new Table({
        name: 'comment',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'post_id', type: 'int', isNullable: false },
          { name: 'parent_id', type: 'int', isNullable: true },
          { name: 'content', type: 'json', isNullable: false },
          { name: 'author_name', type: 'varchar', length: '64', isNullable: false },
          { name: 'password', type: 'varchar', length: '255', isNullable: false },
          { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          { name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
          { name: 'deleted_at', type: 'datetime', isNullable: true },
        ],
      }),
    );
    await queryRunner.createIndex('comment', new TableIndex({ name: 'IDX_comment_post_id', columnNames: ['post_id'] }));
    await queryRunner.createIndex('comment', new TableIndex({ name: 'IDX_comment_parent_id', columnNames: ['parent_id'] }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('comment', 'IDX_comment_post_id');
    await queryRunner.dropIndex('comment', 'IDX_comment_parent_id');
    await queryRunner.dropTable('comment');
    await queryRunner.dropIndex('post', 'IDX_post_title');
    await queryRunner.dropIndex('post', 'IDX_post_author_name');
    await queryRunner.dropTable('post');
  }
}

import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateKeywordNotification1749800948098 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'keyword_notification',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'author_name',
            type: 'varchar',
            length: '64',
            isNullable: false,
          },
          {
            name: 'keyword',
            type: 'varchar',
            length: '64',
            isNullable: false,
          },
          { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          { name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
          { name: 'deleted_at', type: 'datetime', isNullable: true },
        ],
      }),
      true,
    );

    // 인덱스: author_name + keyword 조합에 인덱스 부여 (중복 방지 및 빠른 조회)
    await queryRunner.createIndex(
      'keyword_notification',
      new TableIndex({
        name: 'IDX_KEYWORD_NOTIFICATION_AUTHOR_KEYWORD',
        columnNames: ['author_name', 'keyword'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('keyword_notification', 'IDX_KEYWORD_NOTIFICATION_AUTHOR_KEYWORD');
    await queryRunner.dropTable('keyword_notification');
  }
}

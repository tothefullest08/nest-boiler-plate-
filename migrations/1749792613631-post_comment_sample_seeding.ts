import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostCommentSampleSeeding1749792613631 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
    // "password" 라는 값을 해싱한 값
    const hashedPassword = '$2b$10$cCh4vHLE9zuCTVz5.zRa4OSndarrdEWrrW820mAcEDJdzsexloYe2';

    // 1. 게시글 20개 생성
    for (let i = 1; i <= 20; i++) {
      await queryRunner.query(`INSERT INTO post (title, content, author_name, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`, [
        `Sample Post ${i}`,
        JSON.stringify({ body: `This is the content of sample post ${i}` }),
        `Author${i}`,
        hashedPassword,
      ]);
    }

    // 2. 각 게시글마다 최상위 댓글 5개, 각 최상위 댓글마다 대댓글 2개씩 생성
    // post id는 1~20
    const commentId = 1;
    for (let postId = 1; postId <= 20; postId++) {
      for (let j = 1; j <= 5; j++) {
        // 최상위 댓글
        await queryRunner.query(
          `INSERT INTO comment (post_id, parent_id, content, author_name, password, created_at, updated_at) VALUES (?, NULL, ?, ?, ?, NOW(), NOW())`,
          [postId, JSON.stringify({ body: `Comment ${j} on post ${postId}` }), `Commenter${j}`, hashedPassword],
        );
        // 방금 삽입한 최상위 댓글의 id를 가져옴 (MySQL LAST_INSERT_ID)
        const [{ id: parentId }] = await queryRunner.query('SELECT LAST_INSERT_ID() as id');
        // 대댓글 2개씩
        for (let k = 1; k <= 2; k++) {
          await queryRunner.query(
            `INSERT INTO comment (post_id, parent_id, content, author_name, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [postId, parentId, JSON.stringify({ body: `Reply ${k} to comment ${j} on post ${postId}` }), `Replier${k}`, hashedPassword],
          );
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM comment');
    await queryRunner.query('DELETE FROM post');
  }
}

import { InternalException } from '@common/exception/internal.exception';
import { Comment } from '@domain/board/entity/comment.entity';

describe('Comment 엔티티', () => {
  const postId = 1;
  const content = { text: 'test comment' };
  const authorName = 'tester';
  const password = 'hashed-password';
  const parentId = undefined;
  let comment: Comment;
  const compareFn = (plain: string, hash: string) => plain === 'plain' && hash === password;

  beforeEach(() => {
    comment = new Comment(postId, content, authorName, password, parentId);
  });

  describe('update 메서드', () => {
    it('비밀번호가 일치하면 내용을 수정한다', () => {
      comment.update({ text: 'updated' }, 'plain', compareFn);
      expect(comment.content).toEqual({ text: 'updated' });
    });

    it('비밀번호가 일치하지 않으면 예외를 던진다', () => {
      expect(() => comment.update({ text: 'fail' }, 'wrong', compareFn)).toThrow(InternalException);
    });
  });

  describe('softDelete 메서드', () => {
    it('비밀번호가 일치하면 deletedAt이 설정된다', () => {
      comment.softDelete('plain', compareFn);
      expect(comment.isDeleted()).toBe(true);
      expect(comment.deletedAt).toBeInstanceOf(Date);
    });

    it('비밀번호가 일치하지 않으면 예외를 던진다', () => {
      expect(() => comment.softDelete('wrong', compareFn)).toThrow(InternalException);
    });
  });

  describe('isDeleted 메서드', () => {
    it('삭제되지 않은 경우 false를 반환한다', () => {
      expect(comment.isDeleted()).toBe(false);
    });

    it('삭제된 경우 true를 반환한다', () => {
      comment.deletedAt = new Date();
      expect(comment.isDeleted()).toBe(true);
    });
  });
});

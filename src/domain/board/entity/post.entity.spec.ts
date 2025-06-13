import { Post } from './post.entity';
import { InternalException } from '@common/exception/internal.exception';

describe('Post 엔티티', () => {
  const title = 'test title';
  const content = { text: 'test post' };
  const authorName = 'tester';
  const password = 'hashed-password';
  let post: Post;
  const compareFn = (plain: string, hash: string) => plain === 'plain' && hash === password;

  beforeEach(() => {
    post = new Post(title, content, authorName, password);
  });

  describe('update 메서드', () => {
    it('비밀번호가 일치하면 제목과 내용을 수정한다', () => {
      post.update('updated title', { text: 'updated' }, 'plain', compareFn);
      expect(post.title).toBe('updated title');
      expect(post.content).toEqual({ text: 'updated' });
    });

    it('비밀번호가 일치하지 않으면 예외를 던진다', () => {
      expect(() => post.update('fail', { text: 'fail' }, 'wrong', compareFn)).toThrow(InternalException);
    });
  });

  describe('softDelete 메서드', () => {
    it('비밀번호가 일치하면 deletedAt이 설정된다', () => {
      post.softDelete('plain', compareFn);
      expect(post.isDeleted()).toBe(true);
      expect(post.deletedAt).toBeInstanceOf(Date);
    });

    it('비밀번호가 일치하지 않으면 예외를 던진다', () => {
      expect(() => post.softDelete('wrong', compareFn)).toThrow(InternalException);
    });
  });

  describe('isDeleted 메서드', () => {
    it('삭제되지 않은 경우 false를 반환한다', () => {
      expect(post.isDeleted()).toBe(false);
    });

    it('삭제된 경우 true를 반환한다', () => {
      post.deletedAt = new Date();
      expect(post.isDeleted()).toBe(true);
    });
  });
});

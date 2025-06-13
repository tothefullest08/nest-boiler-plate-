import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PostRepository } from '@domain/board/repository/post.repository';
import { CommentRepository } from '@domain/board/repository/comment.repository';
import { CreatePostCommand } from '@application/board/dto/create-post.command';
import { UpdatePostCommand } from '@application/board/dto/update-post.command';
import { DeletePostCommand } from '@application/board/dto/delete-post.command';
import { ListPostsCriteria } from '@application/board/dto/list-posts.criteria';
import { GetPostCommand } from '@application/board/dto/get-post.command';
import { CreateCommentCommand } from '@application/board/dto/create-comment.command';
import { UpdateCommentCommand } from '@application/board/dto/update-comment.command';
import { DeleteCommentCommand } from '@application/board/dto/delete-comment.command';
import { ListCommentsCriteria } from '@application/board/dto/list-comments.criteria';
import { Post } from '@domain/board/entity/post.entity';
import { Comment } from '@domain/board/entity/comment.entity';
import * as bcrypt from 'bcrypt';
import { InternalException } from '@common/exception/internal.exception';
import { ErrorTypeEnum } from '@common/exception/error.enum';
import { KeywordNotificationRepository } from '@domain/board/repository/keyword-notification.repository';

@Injectable()
export class BoardService {
  readonly SALT_ROUNDS = 10;
  private readonly logger = new Logger(BoardService.name);

  constructor(
    @Inject('PostRepository')
    private readonly postRepository: PostRepository,
    @Inject('CommentRepository')
    private readonly commentRepository: CommentRepository,
    @Inject('KeywordNotificationRepository')
    private readonly keywordNotificationRepository: KeywordNotificationRepository,
  ) {}

  // 게시글 생성
  async createPost(command: CreatePostCommand): Promise<Post> {
    const hash = await bcrypt.hash(command.password, this.SALT_ROUNDS);
    const post = new Post(command.title, command.content, command.authorName, hash);

    // 메세징큐 등을 활용하여 비동기로 처리되게끔 고도화 필요
    // [주의] 아래 방식은 소규모/PoC에서만 사용 가능하며, 키워드가 많아지면 절대 사용하면 안 됩니다.
    // 대규모 서비스에서는 반드시 역색인 기반 검색엔진(예: ElasticSearch) 도입이 필요합니다.
    await this.triggerKeywordNotification(command.content);

    return this.postRepository.save(post);
  }

  // 게시글 수정
  async updatePost(command: UpdatePostCommand): Promise<Post> {
    const post = await this.postRepository.findById(command.id);
    if (!post) {
      this.logger.error(`게시글 수정 실패: 존재하지 않는 게시글 (id: ${command.id})`);
      throw new InternalException(ErrorTypeEnum.NOT_FOUND_ERROR, '존재하지 않는 게시글입니다');
    }
    post.update(command.title, command.content, command.password, (plain, hash) => bcrypt.compareSync(plain, hash));
    return this.postRepository.save(post);
  }

  // 게시글 삭제
  async deletePost(command: DeletePostCommand): Promise<void> {
    const post = await this.postRepository.findById(command.id);
    if (!post) {
      this.logger.error(`게시글 삭제 실패: 존재하지 않는 게시글 (id: ${command.id})`);
      throw new InternalException(ErrorTypeEnum.NOT_FOUND_ERROR, '존재하지 않는 게시글입니다');
    }
    post.softDelete(command.password, (plain, hash) => bcrypt.compareSync(plain, hash));
    await this.postRepository.save(post);
  }

  // 게시글 목록 조회 (검색/페이징)
  async listPosts(criteria: ListPostsCriteria): Promise<{ data: Post[]; total: number }> {
    return this.postRepository.findAll(criteria);
  }

  // 게시글 상세 조회
  async getPost(command: GetPostCommand): Promise<Post> {
    const post = await this.postRepository.findById(command.id);
    if (!post) {
      this.logger.error(`게시글 조회 실패: 존재하지 않는 게시글 (id: ${command.id})`);
      throw new InternalException(ErrorTypeEnum.NOT_FOUND_ERROR, '존재하지 않는 게시글입니다');
    }
    return post;
  }

  // 댓글 생성
  async createComment(command: CreateCommentCommand): Promise<Comment> {
    const hash = await bcrypt.hash(command.password, this.SALT_ROUNDS);
    const comment = new Comment(command.postId, command.content, command.authorName, hash, command.parentId);

    // 메세징큐 등을 활용하여 비동기로 처리되게끔 고도화 필요
    // [주의] 아래 방식은 소규모/PoC에서만 사용 가능하며, 키워드가 많아지면 절대 사용하면 안 됩니다.
    // 대규모 서비스에서는 반드시 역색인 기반 검색엔진(예: ElasticSearch) 도입이 필요합니다.
    await this.triggerKeywordNotification(command.content);

    return this.commentRepository.save(comment);
  }

  // 댓글 수정
  async updateComment(command: UpdateCommentCommand): Promise<Comment> {
    const comment = await this.commentRepository.findById(command.id);
    if (!comment) {
      this.logger.error(`댓글 수정 실패: 존재하지 않는 댓글 (id: ${command.id})`);
      throw new NotFoundException('존재하지 않는 댓글입니다');
    }
    comment.update(command.content, command.password, (plain, hash) => bcrypt.compareSync(plain, hash));
    return this.commentRepository.save(comment);
  }

  // 댓글 삭제
  async deleteComment(command: DeleteCommentCommand): Promise<void> {
    const comment = await this.commentRepository.findById(command.id);
    if (!comment) {
      this.logger.error(`댓글 삭제 실패: 존재하지 않는 댓글 (id: ${command.id})`);
      throw new NotFoundException('존재하지 않는 댓글입니다');
    }
    comment.softDelete(command.password, (plain, hash) => bcrypt.compareSync(plain, hash));
    await this.commentRepository.save(comment);
  }

  // 댓글 목록 조회 (페이징/트리)
  async listComments(criteria: ListCommentsCriteria): Promise<{ data: Comment[]; total: number }> {
    return this.commentRepository.findByPostId(criteria.postId, criteria);
  }

  // [주의] 아래 방식은 소규모/PoC에서만 사용 가능하며, 키워드가 많아지면 절대 사용하면 안 됩니다.
  // 대규모 서비스에서는 반드시 역색인 기반 검색엔진(예: ElasticSearch) 도입이 필요합니다.
  private async triggerKeywordNotification(content: any) {
    const keywordNotifications = await this.keywordNotificationRepository.findAll();
    const text = this.extractAllTextFromContent(content);

    for (const { authorName, keyword } of keywordNotifications) {
      if (text.includes(keyword)) {
        this.sendKeywordNotification(authorName, keyword);
      }
    }
  }

  private sendKeywordNotification(authorName: string, keyword: string) {
    this.logger.log(`[알림] ${authorName}님이 등록한 키워드 "${keyword}"가 포함된 게시글/댓글이 등록됨`);
  }

  private extractAllTextFromContent(content: any): string {
    let result = '';
    function traverse(value: any) {
      if (typeof value === 'string') {
        result += value + ' ';
      } else if (Array.isArray(value)) {
        value.forEach(traverse);
      } else if (typeof value === 'object' && value !== null) {
        Object.values(value).forEach(traverse);
      }
    }

    traverse(content);
    return result.trim();
  }
}

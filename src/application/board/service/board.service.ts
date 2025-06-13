import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class BoardService {
  readonly SALT_ROUNDS = 10;

  constructor(
    @Inject('PostRepository')
    private readonly postRepository: PostRepository,
    @Inject('CommentRepository')
    private readonly commentRepository: CommentRepository,
  ) {}

  // 게시글 생성
  async createPost(command: CreatePostCommand): Promise<Post> {
    const hash = await bcrypt.hash(command.password, this.SALT_ROUNDS);
    const post = new Post(command.title, command.content, command.authorName, hash);
    return this.postRepository.save(post);
  }

  // 게시글 수정
  async updatePost(command: UpdatePostCommand): Promise<Post> {
    const post = await this.postRepository.findById(command.id);
    if (!post) throw new NotFoundException('존재하지 않는 게시글입니다');
    post.update(command.title, command.content, command.password, (pw) => bcrypt.hashSync(pw, this.SALT_ROUNDS));
    return this.postRepository.save(post);
  }

  // 게시글 삭제
  async deletePost(command: DeletePostCommand): Promise<void> {
    const post = await this.postRepository.findById(command.id);
    if (!post) throw new NotFoundException('존재하지 않는 게시글입니다');
    post.softDelete(command.password, (pw) => bcrypt.hashSync(pw, this.SALT_ROUNDS));
    await this.postRepository.save(post);
  }

  // 게시글 목록 조회 (검색/페이징)
  async listPosts(criteria: ListPostsCriteria): Promise<{ data: Post[]; total: number }> {
    return this.postRepository.findAll(criteria);
  }

  // 게시글 상세 조회
  async getPost(command: GetPostCommand): Promise<Post> {
    const post = await this.postRepository.findById(command.id);
    if (!post) throw new NotFoundException('존재하지 않는 게시글입니다');
    return post;
  }

  // 댓글 생성
  async createComment(command: CreateCommentCommand): Promise<Comment> {
    const hash = await bcrypt.hash(command.password, this.SALT_ROUNDS);
    const comment = new Comment(command.postId, command.content, command.authorName, hash, command.parentId);
    return this.commentRepository.save(comment);
  }

  // 댓글 수정
  async updateComment(command: UpdateCommentCommand): Promise<Comment> {
    const comment = await this.commentRepository.findById(command.id);
    if (!comment) throw new NotFoundException('존재하지 않는 댓글입니다');
    comment.update(command.content, command.password, (pw) => bcrypt.hashSync(pw, this.SALT_ROUNDS));
    return this.commentRepository.save(comment);
  }

  // 댓글 삭제
  async deleteComment(command: DeleteCommentCommand): Promise<void> {
    const comment = await this.commentRepository.findById(command.id);
    if (!comment) throw new NotFoundException('존재하지 않는 댓글입니다');
    comment.softDelete(command.password, (pw) => bcrypt.hashSync(pw, this.SALT_ROUNDS));
    await this.commentRepository.save(comment);
  }

  // 댓글 목록 조회 (페이징/트리)
  async listComments(criteria: ListCommentsCriteria): Promise<{ data: Comment[]; total: number }> {
    return this.commentRepository.findByPostId(criteria.postId, criteria);
  }
}

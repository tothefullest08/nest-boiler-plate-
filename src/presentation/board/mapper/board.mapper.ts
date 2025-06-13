import { CreateCommentCommand } from '@application/board/dto/create-comment.command';
import { CreatePostCommand } from '@application/board/dto/create-post.command';
import { DeleteCommentCommand } from '@application/board/dto/delete-comment.command';
import { DeletePostCommand } from '@application/board/dto/delete-post.command';
import { GetPostCommand } from '@application/board/dto/get-post.command';
import { ListCommentsCriteria } from '@application/board/dto/list-comments.criteria';
import { ListPostsCriteria } from '@application/board/dto/list-posts.criteria';
import { UpdateCommentCommand } from '@application/board/dto/update-comment.command';
import { UpdatePostCommand } from '@application/board/dto/update-post.command';
import { Comment } from '@domain/board/entity/comment.entity';
import { Post } from '@domain/board/entity/post.entity';
import { CommentResponse } from '@presentation/board/dto/comment.response';
import { CreateCommentRequest } from '@presentation/board/dto/create-comment.request';
import { CreatePostRequest } from '@presentation/board/dto/create-post.request';
import { DeleteRequest } from '@presentation/board/dto/delete.request';
import { ListCommentsRequest } from '@presentation/board/dto/list-comments.request';
import { ListPostsRequest } from '@presentation/board/dto/list-posts.request';
import { PaginatedCommentResponse } from '@presentation/board/dto/paginated-comment.response';
import { PaginatedPostResponse } from '@presentation/board/dto/paginated-post.response';
import { PostResponse } from '@presentation/board/dto/post.response';
import { UpdateCommentRequest } from '@presentation/board/dto/update-comment.request';
import { UpdatePostRequest } from '@presentation/board/dto/update-post.request';

export class BoardMapper {
  static toCreatePostCommand(dto: CreatePostRequest): CreatePostCommand {
    const command = new CreatePostCommand();
    command.title = dto.title;
    command.content = dto.content;
    command.authorName = dto.authorName;
    command.password = dto.password;
    return command;
  }

  static toUpdatePostCommand(id: number, dto: UpdatePostRequest): UpdatePostCommand {
    const command = new UpdatePostCommand();
    command.id = id;
    command.title = dto.title;
    command.content = dto.content;
    command.password = dto.password;
    return command;
  }

  static toDeletePostCommand(id: number, dto: DeleteRequest): DeletePostCommand {
    const command = new DeletePostCommand();
    command.id = id;
    command.password = dto.password;
    return command;
  }

  static toGetPostCommand(id: number): GetPostCommand {
    const command = new GetPostCommand();
    command.id = id;
    return command;
  }

  static toListPostsCriteria(dto: ListPostsRequest): ListPostsCriteria {
    const criteria = new ListPostsCriteria();
    criteria.page = dto.page;
    criteria.pageSize = dto.pageSize;
    criteria.searchAuthor = dto.searchAuthor;
    criteria.searchTitle = dto.searchTitle;
    return criteria;
  }

  static toPostResponse(entity: Post): PostResponse {
    return new PostResponse({
      id: entity.id,
      title: entity.title,
      content: entity.content,
      authorName: entity.authorName,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      // comments: entity.comments ? entity.comments.map(c => new CommentResponse(c)) : [],
    });
  }

  static toPaginatedPostResponse(result: { data: Post[]; total: number }, dto: ListPostsRequest): PaginatedPostResponse {
    return new PaginatedPostResponse({
      data: result.data.map((post) => BoardMapper.toPostResponse(post)),
      total: result.total,
      page: dto.page,
      pageSize: dto.pageSize,
    });
  }

  static toCreateCommentCommand(postId: number, dto: CreateCommentRequest): CreateCommentCommand {
    const command = new CreateCommentCommand();
    command.postId = postId;
    command.content = dto.content;
    command.authorName = dto.authorName;
    command.password = dto.password;
    command.parentId = dto.parentId;
    return command;
  }

  static toUpdateCommentCommand(id: number, dto: UpdateCommentRequest): UpdateCommentCommand {
    const command = new UpdateCommentCommand();
    command.id = id;
    command.content = dto.content;
    command.password = dto.password;
    return command;
  }

  static toDeleteCommentCommand(id: number, dto: DeleteRequest): DeleteCommentCommand {
    const command = new DeleteCommentCommand();
    command.id = id;
    command.password = dto.password;
    return command;
  }

  static toListCommentsCriteria(postId: number, dto: ListCommentsRequest): ListCommentsCriteria {
    const criteria = new ListCommentsCriteria();
    criteria.postId = postId;
    criteria.page = dto.page;
    criteria.pageSize = dto.pageSize;
    criteria.parentId = dto.parentId;
    return criteria;
  }

  static toCommentResponse(entity: Comment): CommentResponse {
    return new CommentResponse({
      id: entity.id,
      postId: entity.postId,
      parentId: entity.parentId,
      content: entity.content,
      authorName: entity.authorName,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      children: entity.children ? entity.children.map((c) => BoardMapper.toCommentResponse(c)) : [],
    });
  }

  static toPaginatedCommentResponse(result: { data: Comment[]; total: number }, dto: ListCommentsRequest): PaginatedCommentResponse {
    return new PaginatedCommentResponse({
      data: result.data.map((comment) => BoardMapper.toCommentResponse(comment)),
      total: result.total,
      page: dto.page,
      pageSize: dto.pageSize,
    });
  }
}

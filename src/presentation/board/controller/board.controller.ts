import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardService } from '@application/board/service/board.service';
import { CreatePostRequest } from '@presentation/board/dto/create-post.request';
import { PostResponse } from '@presentation/board/dto/post.response';
import { UpdatePostRequest } from '@presentation/board/dto/update-post.request';
import { DeleteRequest } from '@presentation/board/dto/delete.request';
import { ListPostsRequest } from '@presentation/board/dto/list-posts.request';
import { PaginatedPostResponse } from '@presentation/board/dto/paginated-post.response';
import { CreateCommentRequest } from '@presentation/board/dto/create-comment.request';
import { CommentResponse } from '@presentation/board/dto/comment.response';
import { UpdateCommentRequest } from '@presentation/board/dto/update-comment.request';
import { ListCommentsRequest } from '@presentation/board/dto/list-comments.request';
import { PaginatedCommentResponse } from '@presentation/board/dto/paginated-comment.response';
import { BoardMapper } from '@presentation/board/mapper/board.mapper';

@ApiTags('Board API')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('posts')
  @ApiOperation({ summary: '게시글 생성', description: '새로운 게시글을 생성합니다.' })
  @ApiResponse({ status: 200, description: '게시글 생성 성공', type: PostResponse })
  async createPost(@Body() createPostDto: CreatePostRequest): Promise<PostResponse> {
    const command = BoardMapper.toCreatePostCommand(createPostDto);
    const post = await this.boardService.createPost(command);
    return BoardMapper.toPostResponse(post);
  }

  @Get('posts')
  @ApiOperation({ summary: '게시글 목록 조회', description: '조건에 맞는 게시글 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '게시글 목록 조회 성공', type: PaginatedPostResponse })
  async listPosts(@Query() query: ListPostsRequest): Promise<PaginatedPostResponse> {
    const criteria = BoardMapper.toListPostsCriteria(query);
    const result = await this.boardService.listPosts(criteria);
    return BoardMapper.toPaginatedPostResponse(result, query);
  }

  @Get('posts/:id')
  @ApiOperation({ summary: '게시글 상세 조회', description: '특정 게시글의 상세 정보를 조회합니다.' })
  @ApiResponse({ status: 200, description: '게시글 상세 조회 성공', type: PostResponse })
  @ApiParam({ name: 'id', description: '게시글 ID', type: Number })
  async getPost(@Param('id') id: number): Promise<PostResponse> {
    const command = BoardMapper.toGetPostCommand(id);
    const post = await this.boardService.getPost(command);
    return BoardMapper.toPostResponse(post);
  }

  @Put('posts/:id')
  @ApiOperation({ summary: '게시글 수정', description: '특정 게시글을 수정합니다.' })
  @ApiResponse({ status: 200, description: '게시글 수정 성공', type: PostResponse })
  @ApiParam({ name: 'id', description: '게시글 ID', type: Number })
  async updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostRequest): Promise<PostResponse> {
    const command = BoardMapper.toUpdatePostCommand(id, updatePostDto);
    const post = await this.boardService.updatePost(command);
    return BoardMapper.toPostResponse(post);
  }

  @Delete('posts/:id')
  @ApiOperation({ summary: '게시글 삭제', description: '특정 게시글을 삭제합니다.' })
  @ApiResponse({ status: 200, description: '게시글 삭제 성공' })
  @ApiParam({ name: 'id', description: '게시글 ID', type: Number })
  async deletePost(@Param('id') id: number, @Body() deleteDto: DeleteRequest): Promise<void> {
    const command = BoardMapper.toDeletePostCommand(id, deleteDto);
    await this.boardService.deletePost(command);
  }

  @Post('posts/:postId/comments')
  @ApiOperation({ summary: '댓글 생성', description: '특정 게시글에 새로운 댓글을 생성합니다.' })
  @ApiResponse({ status: 200, description: '댓글 생성 성공', type: CommentResponse })
  @ApiParam({ name: 'postId', description: '게시글 ID', type: Number })
  async createComment(@Param('postId') postId: number, @Body() createCommentDto: CreateCommentRequest): Promise<CommentResponse> {
    const command = BoardMapper.toCreateCommentCommand(postId, createCommentDto);
    const comment = await this.boardService.createComment(command);
    return BoardMapper.toCommentResponse(comment);
  }

  @Get('posts/:postId/comments')
  @ApiOperation({ summary: '댓글 목록 조회', description: '특정 게시글의 댓글 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '댓글 목록 조회 성공', type: PaginatedCommentResponse })
  @ApiParam({ name: 'postId', description: '게시글 ID', type: Number })
  async listComments(@Param('postId') postId: number, @Query() query: ListCommentsRequest): Promise<PaginatedCommentResponse> {
    const criteria = BoardMapper.toListCommentsCriteria(postId, query);
    const result = await this.boardService.listComments(criteria);
    return BoardMapper.toPaginatedCommentResponse(result, query);
  }

  @Put('comments/:id')
  @ApiOperation({ summary: '댓글 수정', description: '특정 댓글을 수정합니다.' })
  @ApiResponse({ status: 200, description: '댓글 수정 성공', type: CommentResponse })
  @ApiParam({ name: 'id', description: '댓글 ID', type: Number })
  async updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentRequest): Promise<CommentResponse> {
    const command = BoardMapper.toUpdateCommentCommand(id, updateCommentDto);
    const comment = await this.boardService.updateComment(command);
    return BoardMapper.toCommentResponse(comment);
  }

  @Delete('comments/:id')
  @ApiOperation({ summary: '댓글 삭제', description: '특정 댓글을 삭제합니다.' })
  @ApiResponse({ status: 200, description: '댓글 삭제 성공' })
  @ApiParam({ name: 'id', description: '댓글 ID', type: Number })
  async deleteComment(@Param('id') id: number, @Body() deleteDto: DeleteRequest): Promise<void> {
    const command = BoardMapper.toDeleteCommentCommand(id, deleteDto);
    await this.boardService.deleteComment(command);
  }
}

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BlogsService } from '../application/blogs.service';
import { CreateBlogInputModel } from './model/input/createBlog.input.model';
import { BlogsQueryRepository } from '../infrastructure/blogsQuery.repository';
import { ReturnViewModel } from '../../1_commonTypes/returnViewModel';
import { BlogViewModel } from './model/output/createdBlog.output.model';
import { RequestType } from '../../1_commonTypes/commonTypes';
import { QueryBlogsTypes } from './model/types/queryBlogsTypes';
import { ParamType } from '../../1_commonTypes/paramType';
import { UpdateBlogInputModel } from './model/input/updateBlog.input.model';
import {
  CreatePostInputModel,
  CreatePostInputModelWithoutBlogId
} from '../../posts/api/model/input/createPost.input.model';
import { QueryPostsType } from '../../posts/api/types/queryPostsType';
import { PostService } from '../../posts/application/postService';
import { AuthGuard } from '../../../infrastructure/guards/auth.guard';
import { GetUserDataGuard } from '../../../infrastructure/guards/getUserData.guard';
import { CreateBlogUseCase } from '../application/useCases/createBlog.use-case';


@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService,
              private blogsQueryRepository: BlogsQueryRepository,
              private postService: PostService,
              private createBlogUseCase: CreateBlogUseCase) {
  }

  @UseGuards(AuthGuard)
  @Post()
  async createBlog(@Body() dto: CreateBlogInputModel): Promise<BlogViewModel> {
    const blog = await this.createBlogUseCase.execute(dto);
    const res = await this.blogsQueryRepository.getBlogById(blog.id);
    if (!res) throw new Error('something went wrong');
    return res;
  }

  @Get()
  async getBlogs(@Req() req: RequestType<{}, {}, QueryBlogsTypes>): Promise<ReturnViewModel<BlogViewModel[]> | null> {
    return await this.blogsQueryRepository.getBlogs(req.query);
  }

  async getBlogById(@Param() param: ParamType) {
    return this.blogsQueryRepository.getBlogById(param.id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/posts')
  async createPost(@Param() param: ParamType,
                   @Body() dto: CreatePostInputModelWithoutBlogId) {
    const data: CreatePostInputModel = {

      shortDescription: dto.shortDescription,
      content: dto.content,
      title: dto.title,
      blogId: param.id
    };

    return await this.postService.createPost(data);

  }

  @Get(':id/posts')
  @UseGuards(GetUserDataGuard)
  async getPosts(@Req() req: RequestType<ParamType, {}, QueryPostsType>) {
    await this.blogsQueryRepository.getBlogById(req.params.id);
    return await this.blogsQueryRepository.getBlogPosts(req.params.id, req.query, req.user?.userId);

  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBlog(@Param() param: ParamType,
                   @Body() dto: UpdateBlogInputModel) {
    return await this.blogsService.updateBlog(param.id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(@Param() param: ParamType) {
    return await this.blogsService.deleteBlog(param.id);
  }
}
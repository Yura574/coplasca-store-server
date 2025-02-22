import { InterlayerNotice } from '../../../../infrastructure/interlayers/interlayerNotice';
import { BlogsRepository } from '../../infrastructure/blogs.repository';
import { CreateBlogInputModel } from '../../api/model/input/createBlog.input.model';
import { NewBlogType } from '../../api/model/types/newBlogType';
import { BlogDocument } from '../../domain/blog.entity';
import { Injectable } from '@nestjs/common';


@Injectable()
export class CreateBlogUseCase {

  constructor(private blogRepository: BlogsRepository) {
  }

  async execute(data: CreateBlogInputModel){
    const { description, websiteUrl, name } = data;
    const newBlog: NewBlogType = {
      name,
      websiteUrl,
      description,
      createdAt: new Date().toISOString(),
      isMembership: false
    };
   return  await this.blogRepository.createBlog(newBlog);


  }
}
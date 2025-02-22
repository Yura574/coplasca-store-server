import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../domain/blog.entity';
import { Model } from 'mongoose';
import { UpdateBlogInputModel } from '../api/model/input/updateBlog.input.model';
import { NewBlogType } from '../api/model/types/newBlogType';


@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
  }

  async createBlog(dto: NewBlogType) {
    try {
      const createdBlog = await this.blogModel.create(dto);
      return await createdBlog.save();
      } catch (err) {
      console.log(err);
      throw new Error('something was wrong');
    }
  }

  async updateBlog(id: string, dto: UpdateBlogInputModel) {
    const { description, websiteUrl, name } = dto;
    const blog = await this.blogModel.findById(id);
    if (!blog) throw new NotFoundException('Blog not found');

    try {
      return await this.blogModel.updateOne({ _id: id }, { $set: { name, description, websiteUrl } });
    } catch (err) {
      console.log(err);
      throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async deleteBlog(blogId: string) {
    const result = await this.blogModel.deleteOne({ _id: blogId });
    if (!result.deletedCount) {
      throw new NotFoundException('Blog not found');
    }
    return result;
  }


}
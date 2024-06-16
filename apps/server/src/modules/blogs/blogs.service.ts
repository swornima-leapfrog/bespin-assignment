import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BlogRepository } from './repository/blog.repository';
import { CreateBlogDto } from './dto/create-blog-dto';
import { UpdateBlogDto } from './dto/update-blog-dto';

@Injectable()
export class BlogsService {
  constructor(private readonly blogRepository: BlogRepository) {}

  getAllBlogs() {
    return this.blogRepository.getAllBlogs();
  }

  async getBlogById(id: number) {
    const blog = await this.blogRepository.getBlogById(id);

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }

  getBlogByUserId(userId: number) {
    return this.blogRepository.getBlogByUserId(userId);
  }

  async createBlog(userId: number, createBlogDto: CreateBlogDto) {
    const blog = await this.blogRepository.createBlog(createBlogDto);

    await this.blogRepository.addBlogEdge(userId, blog.id);

    const blogWithAuthor = await this.getBlogById(blog.id);

    return blogWithAuthor;
  }

  async updateBlog(userId: number, id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.getBlogById(id);

    if (blog.author.id !== userId) {
      throw new ForbiddenException('You are not the author of this blog');
    }

    await this.blogRepository.updateBlog(id, updateBlogDto);

    const blogWithAuthor = await this.getBlogById(id);

    return blogWithAuthor;
  }

  async deleteBlog(userId: number, id: number) {
    const blog = await this.getBlogById(id);

    if (blog.author.id !== userId) {
      throw new ForbiddenException('You are not the author of this blog');
    }

    await this.blogRepository.deleteBlog(id);

    return {
      message: `Blog of id ${id} has been deleted`,
    };
  }
}

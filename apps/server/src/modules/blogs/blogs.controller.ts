import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthRequest } from '@/interfaces/authenticate-request.interface';
import { CreateBlogDto } from './dto/create-blog-dto';
import { JwtGuard } from '../auth/guard/auth.jwt.guard';
import { UpdateBlogDto } from './dto/update-blog-dto';

@UseGuards(JwtGuard)
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  getBlogById(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.getBlogById(id);
  }

  @Get('user/:userId')
  getBlogByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.blogService.getBlogByUserId(userId);
  }

  @Post()
  createBlog(
    @Request() req: AuthRequest,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    return this.blogService.createBlog(req.user.id, createBlogDto);
  }

  @Put(':id')
  updateBlog(
    @Request() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogService.updateBlog(req.user.id, id, updateBlogDto);
  }

  @Delete(':id')
  deleteBlog(
    @Request() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.blogService.deleteBlog(req.user.id, id);
  }
}

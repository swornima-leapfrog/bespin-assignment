import { GetBlogDto } from '@/modules/blogs/dto/get-blog-dto';
import { GetUserDto } from '@/modules/users/dto/get-user-dto';

export interface BlogAndAuthor {
  blog: GetBlogDto;
  author: GetUserDto;
}

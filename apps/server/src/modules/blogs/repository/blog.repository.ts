import { BaseRepository } from '@/modules/gremlin/base.repository';
import { GremlinService } from '@/modules/gremlin/gremlin.service';
import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../dto/create-blog-dto';
import { GetBlogDto } from '../dto/get-blog-dto';
import { BlogAndAuthor } from '@/interfaces/blog.interface';
import { GetBlogWithAuthorIdDto } from '../dto/get-blog-with-author-id-dto';
import { UpdateBlogDto } from '../dto/update-blog-dto';
// import { process } from 'gremlin';

// const { statics } = process;

@Injectable()
export class BlogRepository extends BaseRepository {
  constructor(readonly gremlinService: GremlinService) {
    super(gremlinService, 'blogs');
  }

  async getAllBlogs() {
    const g = this.gremlinService.getClient();

    const traversal = g
      .V()
      .as('blog')
      .out('writtenBy')
      .as('author')
      .select('blog', 'author');

    const blog = this.mapToModel(await this.execute<BlogAndAuthor>(traversal));

    return blog;
  }

  async getBlogById(blogId: number) {
    const g = this.gremlinService.getClient();

    const traversal = g
      .V(blogId)
      .as('blog')
      .out('writtenBy')
      .as('author')
      .select('blog', 'author');

    const [blog] = this.mapToModel(
      await this.execute<BlogAndAuthor>(traversal),
    );

    return blog;
  }

  async getBlogByUserId(userId: number) {
    const g = this.gremlinService.getClient();

    const traversal = g
      .V(userId)
      .as('author')
      .in_('writtenBy')
      .as('blog')
      .select('author', 'blog');

    return this.mapToModel(await this.execute<BlogAndAuthor>(traversal));
  }

  async createBlog(createBlogDto: CreateBlogDto) {
    const g = this.gremlinService.getClient();

    const traversal = g.addV(this.vertexLabel);

    Object.entries(createBlogDto).forEach(([key, value]) => {
      traversal.property(key, value);
    });

    const [blog] = await this.execute<GetBlogDto>(traversal);

    return blog;
  }

  async updateBlog(id: number, updateBlogDto: UpdateBlogDto) {
    const g = this.gremlinService.getClient();

    const traversal = g.V(id);

    Object.entries(updateBlogDto).forEach(([key, value]) => {
      traversal.property(key, value);
    });

    const [blog] = await this.execute<GetBlogDto>(traversal);

    return blog;
  }

  deleteBlog(id: number) {
    const g = this.gremlinService.getClient();

    const traversal = g.V(id).drop();

    return this.execute(traversal);
  }

  addBlogEdge(currentUserId: number, blogId: number) {
    const g = this.gremlinService.getClient();

    const traversal = g
      .V(currentUserId)
      .as('currentUser')
      .V(blogId)
      .as('blog')
      .addE('writtenBy')
      .from_('blog')
      .to('currentUser');

    return traversal.next();
  }

  removeBlogEdge() {}

  mapToModel(data: BlogAndAuthor[]): GetBlogWithAuthorIdDto[] {
    return data.map(({ blog, author }) => {
      return {
        ...blog,
        author: {
          id: author.id,
          username: author.username,
        },
      };
    });
  }
}

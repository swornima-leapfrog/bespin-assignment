import { Module } from '@nestjs/common';
import { BlogRepository } from './repository/blog.repository';
import { GremlinModule } from '../gremlin/gremlin.module';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  imports: [GremlinModule],
  controllers: [BlogsController],
  providers: [BlogsService, BlogRepository],
})
export class BlogsModule {}

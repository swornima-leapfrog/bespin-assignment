import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GremlinModule } from '../gremlin/gremlin.module';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [GremlinModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}

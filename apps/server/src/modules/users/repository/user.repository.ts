import { GremlinService } from '@/modules/gremlin/gremlin.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { BaseRepository } from '@/modules/gremlin/base.repository';
import { GetUserDto } from '../dto/get-user-dto';

@Injectable()
export class UserRepository extends BaseRepository {
  constructor(readonly gremlinService: GremlinService) {
    super(gremlinService, 'users');
  }

  createUser(createUserDto: CreateUserDto) {
    const g = this.gremlinService.getClient();

    const vertexLabel = g.addV('users');

    Object.entries(createUserDto).forEach(([key, value]) => {
      vertexLabel.property(key, value);
    });

    return this.execute<CreateUserDto>(vertexLabel);
  }

  getUsers() {
    const g = this.gremlinService.getClient();

    const vertexLabel = g.V().hasLabel('users');

    const users = this.execute<GetUserDto>(vertexLabel);

    return users;
  }

  async getUserById(id: number) {
    const g = this.gremlinService.getClient();

    const vertexLabel = g.V(id);

    const [user] = await this.execute<GetUserDto>(vertexLabel);

    return user;
  }

  async getUserByEmail(email: string) {
    const g = this.gremlinService.getClient();

    const vertexLabel = g.V().has('users', 'email', email);

    const [user] = await this.execute<GetUserDto>(vertexLabel);

    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const g = this.gremlinService.getClient();

    const vertexLabel = g.V(id);

    Object.entries(updateUserDto).forEach(([key, value]) => {
      vertexLabel.property(key, value);
    });

    return this.execute<UpdateUserDto>(vertexLabel);
  }

  deleteUser(id: number) {
    const g = this.gremlinService.getClient();

    const vertexLabel = g.V(id).drop();

    return this.execute(vertexLabel);
  }
}

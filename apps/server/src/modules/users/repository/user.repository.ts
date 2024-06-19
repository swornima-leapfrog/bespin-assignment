import { Injectable } from '@nestjs/common';
import { GetUserDto } from '../dto/get-user-dto';
import { CreateUserDto } from '../dto/create-user-dto';
import { GremlinService } from '@/modules/gremlin/gremlin.service';
import { UpdateUserDto } from '../dto/update-user-dto';
import { BaseRepository } from '@/modules/gremlin/base.repository';

@Injectable()
export class UserRepository extends BaseRepository {
  constructor(readonly gremlinService: GremlinService) {
    super(gremlinService, 'users');
  }

  createUser(createUserDto: CreateUserDto) {
    const g = this.gremlinService.getClient();

    const traversal = g.addV(this.vertexLabel);

    Object.entries(createUserDto).forEach(([key, value]) => {
      traversal.property(key, value);
    });

    return this.execute<CreateUserDto>(traversal);
  }

  getUsers() {
    const g = this.gremlinService.getClient();

    const traversal = g.V().hasLabel(this.vertexLabel);

    const users = this.execute<GetUserDto>(traversal);

    return users;
  }

  async getUserById(id: number) {
    const g = this.gremlinService.getClient();

    const traversal = g.V(id);

    const [user] = await this.execute<GetUserDto>(traversal);

    return user;
  }

  async getUserByEmail(email: string) {
    const g = this.gremlinService.getClient();

    const traversal = g.V().has(this.vertexLabel, 'email', email);

    const [user] = await this.execute<GetUserDto>(traversal);

    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const g = this.gremlinService.getClient();

    const traversal = g.V(id);

    Object.entries(updateUserDto).forEach(([key, value]) => {
      traversal.property(key, value);
    });

    return this.execute<UpdateUserDto>(traversal);
  }

  deleteUser(id: number) {
    const g = this.gremlinService.getClient();

    const traversal = g.V(id).drop();

    return this.execute(traversal);
  }

  searchByUserName(username: string) {
    const g = this.gremlinService.getClient();

    const traversal = g.V().has(this.vertexLabel, 'username', username);

    return this.execute<GetUserDto>(traversal);
  }
}

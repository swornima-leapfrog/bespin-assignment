import bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserRepository } from './repository/user.repository';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUser: CreateUserDto) {
    const { email, password } = createUser;

    const doesEmailExist = await this.userRepository.getUserByEmail(email);

    if (doesEmailExist) {
      throw new BadRequestException('Email already exists');
    }

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userRepository.createUser({
      ...createUser,
      password: hashedPassword,
    });
  }

  async getUsers() {
    return this.userRepository.getUsers();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;
    await this.getUserById(id);

    if (email) {
      const doesEmailExist = await this.userRepository.getUserByEmail(email);

      if (doesEmailExist && doesEmailExist.id !== id) {
        throw new BadRequestException('Email already exists');
      }
    }

    return this.userRepository.updateUser(id, updateUserDto);
  }

  async deleteUser(id: number) {
    await this.getUserById(id);
    this.userRepository.deleteUser(id);
    return { message: `User of id ${id} has been deleted` };
  }

  async searchByUserName(username: string) {
    return this.userRepository.searchByUserName(username);
  }
}

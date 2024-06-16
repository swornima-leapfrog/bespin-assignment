import bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = {
      email: user.email,
      id: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!user || !comparePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}

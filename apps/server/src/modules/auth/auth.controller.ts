import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';
import { LocalAuthGuard } from './guard/auth.local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.username, loginUserDto.password);
  }
}

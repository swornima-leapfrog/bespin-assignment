import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guard/auth.local.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportLocalStrategy } from './strategy/passport.local.strategy';
import { JwtGuard } from './guard/auth.jwt.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_ACCESS_EXPIRY') },
      }),
    }),
  ],
  providers: [
    AuthService,
    PassportLocalStrategy,
    LocalAuthGuard,
    ConfigService,
    JwtStrategy,
    JwtGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

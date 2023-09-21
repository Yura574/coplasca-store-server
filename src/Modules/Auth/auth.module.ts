import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../User/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.stategy';
import { JwtStrategy } from './strategies/jwtStrategy';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { RefreshTokenStrategy } from './strategies/refreshTokenStrategy';
import { UserService } from '../User/user.service';

const jwtFactory = {
  imports: [ConfigModule],
  useFactory: () => ({
    secret: process.env.JWT_SECRET,
    global: true,
    signOptions: {
      expiresIn: process.env.JWT_EXP_H
    }
  }),
  inject: [ConfigService],
};

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  imports: [UserModule,
    JwtModule.registerAsync(jwtFactory),
  ],
  exports: [AuthService]
})

export class AuthModule {}
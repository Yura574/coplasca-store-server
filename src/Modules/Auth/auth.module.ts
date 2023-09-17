import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../User/user.module';
import { User } from '../../Entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';


@Module({
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy],
  imports:[UserModule, PassportModule],
  exports:[AuthService]
})

export class AuthModule{}
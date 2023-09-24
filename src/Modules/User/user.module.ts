import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../Entity/user.entity';
import {TokenModule} from '../Token/token.module';


@Module({
  providers:[UserService],
  controllers: [UserController],
  imports:[TypeOrmModule.forFeature([User]), forwardRef(() => TokenModule)],
  exports: [UserService]
})

export class UserModule{}
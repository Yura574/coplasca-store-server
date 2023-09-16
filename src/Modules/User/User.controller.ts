import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './User.service';
import { UserDto } from '../../Entities/dto/userDto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() dto: UserDto) {
    console.log(dto);
    return this.userService.createUser(dto);
  }

  @Get('all')
 async getUsers() {
    const users = await this.userService.getUsers();
    console.log(users);
    return users
  }

  @Delete('delete/:id')
  deleteUser( ) {
    return 'delete user';
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from '../../Entity/dto/userCreateDto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuth } from '../Auth/guards/jwt-auth.guard';


@Controller('user')

export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuth)
  @Get('test')
  test(){
    return 'test'
  }

  @Get()
  getUserById(@Body() body: string) {
    return this.userService.getUserByEmail(body);
  }

  @Post()
  createUser(@Body() userDto: UserCreateDto) {
    console.log(userDto);
    return this.userService.createUser(userDto);
  }
}
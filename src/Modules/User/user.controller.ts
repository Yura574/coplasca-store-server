import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from '../../Entity/dto/userCreateDto';


@Controller('user')

export class UserController{
  constructor(private userService: UserService) {}


  @Get(':id')
  getUserById(@Body() body: string){
    return this.userService.getUserByEmail('email')
  }

  @Post()
  createUser(@Body() userDto: UserCreateDto){
    console.log(userDto);
    return this.userService.createUser(userDto)
  }
}
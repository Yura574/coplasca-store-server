import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  Param,
  Post,
  Req, UseGuards
} from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { UserInputModel } from './models/input/createUser.input.model';
import { UserViewModel } from './models/output/createdUser.output.model';
import { Request } from 'express';
import { UsersQueryRepository } from '../infrastructure/usersQuery.repository';
import { ReturnViewModel } from '../../1_commonTypes/returnViewModel';
import { RegistrationUserType, UserType } from './models/types/userType';
import { ParamType } from '../../1_commonTypes/paramType';
import { AuthGuard } from '../../../infrastructure/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private usersService: UsersService,
    private usersQueryRepository: UsersQueryRepository
  ) {
  }

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() dto: UserInputModel): Promise<UserViewModel> {
    const result = await this.usersService.createUser(dto);
    return result.data;
  }

  @Get()
  async getUsers(@Req() req: Request): Promise<ReturnViewModel<UserType[]>> {
    console.log('process.env.ENV =', process.env.ENV);
    return await this.usersQueryRepository.getUsers(req.query);
  }

  @Get(':id')
  async getUserById(@Param() param: ParamType) {
    return await this.usersQueryRepository.getUserById(param.id);
  }


  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() params: any) {

    return await this.usersService.deleteUser(params.id);


  }
}

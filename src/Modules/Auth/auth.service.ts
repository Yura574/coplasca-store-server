import { UserService } from '../User/user.service';
import { RegisterDto } from '../../Entity/dto/registerDto';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async comparePassword(password: string, userPassword: string) {
    if(!userPassword){
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
    const isComparePassword = await bcrypt.compare(
      password,
      userPassword
    );
    if (!isComparePassword) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
    return true
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    const isComparePassword = await this.comparePassword(password, user.password);
    if(user && isComparePassword){
      user.password = undefined
      return user
    }

  }

  public async register(registrationData: RegisterDto) {
    const hashPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.createUser({ ...registrationData, password: hashPassword });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(`${error.response}`, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      await this.comparePassword(password, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
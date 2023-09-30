import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../Entity/user.entity';
import { UserCreateDto } from '../../Entity/dto/userCreateDto';
import { UserUpdateDto } from '../../Entity/dto/userUpdateDto';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from '../Token/token.service';


@Injectable()

export class UserService {
  constructor(@InjectRepository(User)

              private userRepository: Repository<User>,
              @Inject(forwardRef(() => TokenService))
              private tokenService: TokenService) {
  }


  async sendActivationLink(to: string, link: string) {

  }

  async createUser(userDto: UserCreateDto) {
    const { email, password } = userDto;
    const existUser = await this.userRepository.findOneBy({ email });
    if (existUser) {
      console.log('exist');
      throw new HttpException('user already exists', 403);
    } else {

      const activationLink = 'uuidv4()';

      const newUser = await this.userRepository.create({ email, password });

      console.log('create User');
      // await this.sendActivationLink(email, activationLink)
      const token = await this.tokenService.createToken(email);
      console.log('create token');
      newUser.token = token;
      const savedUser = await this.userRepository.save(newUser);
      console.log('saved user', savedUser);


      return { newUser, token };
    }

  }

  async getUserByEmail(email: string) {
    try {
      const user = this.userRepository.findOneBy({ email });
      if (user) {
        return user;
      }
    } catch (e) {
      throw new HttpException('user not found', 404);
    }
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      await this.userRepository.remove(user);
      return `user ${user.email} was deleted`;
    } else {
      throw new HttpException('user not found', 404);
    }
  }

  async updateUser(userUpdateDto: UserUpdateDto) {
    try {
      const user = await this.userRepository.findOneBy({ id: +userUpdateDto.id });
      if (user) {
        return await this.userRepository.update(userUpdateDto.id, { password: userUpdateDto.password });
      }
    } catch {
      throw new HttpException('user not found', 404);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
    }

  }

  async setCurrentRefreshToken(token: any, userId: number) {
    console.log(userId);
    // const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // await this.userRepository.update(userId, {
    //     currentHashedRefreshToken
    // });
    await this.userRepository.update(userId, { token });
  }
}
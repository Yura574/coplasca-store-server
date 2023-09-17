import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../Entity/user.entity';
import { UserCreateDto } from '../../Entity/dto/userCreateDto';
import { UserUpdateDto } from '../../Entity/dto/userUpdateDto';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()

export class UserService {
  constructor(@InjectRepository(User)
              private userRepository: Repository<User>) {}

  async createUser(userDto: UserCreateDto) {
    const { email, password } = userDto;
    const existUser = await this.userRepository.findOneBy({ email });
    if (existUser) {
      throw new HttpException('user alredy exists', 403);
    } else {
      const newUser = this.userRepository.create({ email, password });
      await this.userRepository.save(newUser);
      return newUser;
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
      return await this.userRepository.remove(user);
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
}
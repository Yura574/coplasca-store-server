import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../Entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../../Entities/dto/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async createUser(dto: UserDto) {
    console.log(dto);
    return await this.UserRepository.save(dto);
  }

  async getUsers() {
    return await this.UserRepository.find();
  }
}

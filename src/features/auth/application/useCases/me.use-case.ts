import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { FindUserType } from '../../../users/api/models/types/userType';
import { UserType } from '../../../1_commonTypes/commonTypes';

@Injectable()
export class MeUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(userData: UserType) {
    const user: FindUserType | null = await this.userRepository.findUser(
      userData.login,
    );
    return user;
  }
}

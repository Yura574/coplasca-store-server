import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { FindUserType } from '../../../users/api/models/types/userType';

@Injectable()
export class LoginUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(loginOrEmail: string, password: string) {
    const user: FindUserType | null = await this.userRepository.findUser(
      loginOrEmail,
    );
    if (!user) {
      console.log(user);
      throw new BadRequestException(
        'Password2 or login  is wrong',
      );
    }
    console.log(user);

    if (!user.emailConfirmation.isConfirm) {
      throw new ForbiddenException('Confirmed our email');
    }
    console.log('1', await bcrypt.compare(password, user.password));
    console.log('2', await bcrypt.compare(user.password, password));

    const isCompare = await bcrypt.compare(password, user.password);
    console.log(isCompare);
    if (!isCompare) {
      throw new BadRequestException('Password1 or login is wrong');
    }

    const accessPayload = {
      userId: user?._id.toString(),
      email: user?.email,
      login: user?.login,
      deviceId: v4(),
    };
    const refreshPayload = {
      userId: user?._id.toString(),
      email: user?.email,
      login: user?.login,
      deviceId: v4(),
    };
    return {
      accessCookie: jwt.sign(
        accessPayload,
        process.env.ACCESS_SECRET as string,
        { expiresIn: '15m' },
      ),
      refreshCookie: jwt.sign(
        refreshPayload,
        process.env.REFRESH_SECRET as string,
        { expiresIn: '30d' },
      ),
    };
  }
}

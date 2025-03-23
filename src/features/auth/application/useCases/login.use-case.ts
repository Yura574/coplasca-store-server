import {ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {v4} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {UsersRepository} from '../../../users/infrastructure/users.repository';
import {FindUserType} from '../../../users/api/models/types/userType';


@Injectable()
export class LoginUseCase {
  constructor(private userRepository: UsersRepository) {
  }

  async execute(loginOrEmail: string, password: string, secret?: string) {
    const user: FindUserType | null = await this.userRepository.findUser(loginOrEmail);

    if (!user) {
      throw new UnauthorizedException('If the password or login or email is wrong');
    }
    if (!user.emailConfirmation.isConfirm) {
      throw new ForbiddenException('Confirmed our email');
    }
    const isCompare = await bcrypt.compare(password, user.password);

    if (!isCompare ?? secret !=='secret') {
      throw new UnauthorizedException('password or login or email is wrong');
    }

    const accessPayload = {
      userId: user._id.toString(),
      email: user.email,
      login: user.login,
      deviceId: v4()
    };
    const refreshPayload = {
      userId: user._id.toString(),
      email: user.email,
      login: user.login,
      deviceId: v4()
    };
    return {
      accessCookie: jwt.sign(accessPayload, process.env.ACCESS_SECRET as string, {expiresIn: '15m'}),
      refreshCookie: jwt.sign(refreshPayload, process.env.REFRESH_SECRET as string, {expiresIn: '30d'})

    };
  }
}
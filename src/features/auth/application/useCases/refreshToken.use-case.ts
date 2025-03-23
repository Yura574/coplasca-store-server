import {Injectable} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import {UsersRepository} from '../../../users/infrastructure/users.repository';


@Injectable()
export class RefreshTokenUseCase {
  constructor(private userRepository: UsersRepository) {
  }

  async execute(user: any) {

    const accessPayload = {
      userId: user.userId,
      email: user.email,
      login: user.login,
      deviceId: user.deviceId,
    };
    const refreshPayload = {
      userId: user.userId,
      email: user.email,
      login: user.login,
      deviceId: user.deviceId,
    };
    return {
      accessCookie: jwt.sign(accessPayload, process.env.ACCESS_SECRET as string, {expiresIn: '10s'}),
      refreshCookie: jwt.sign(refreshPayload, process.env.REFRESH_SECRET as string, {expiresIn: '60m'})

    };
  }


}
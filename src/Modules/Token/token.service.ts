import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../../Entity/token.entity';
import { Repository } from 'typeorm';
import { UserService } from '../User/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class TokenService {
  constructor(@InjectRepository(Token)

              private tokenRepository: Repository<Token>,
              @Inject(forwardRef(() => UserService))
              private userService: UserService,
              private jwtService: JwtService) {
  }

  async generateToken(email: string) {
    console.log('token123');
    const payload = { email: email };
//         console.log( process.env.JWT_EXP_H);
//         const payload = { email };
//
//         const token =await this.jwtService.signAsync(payload, {
//             secret: process.env.JWT_REFRESH_SECRET,
//             expiresIn: '20m'
//         });
    return {
      access: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_EXP_ACCESS
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_EXP_REFRESH
      })
    };
  }

  async createToken(email: string) {
    const token = await this.generateToken(email);
   return await this.tokenRepository.save({ refreshToken: token.refreshToken });


  }

  async deleteToken(tokenId: number) {
    const token = await this.tokenRepository.findOneBy({ id: tokenId });
    if (token) {
      return await this.tokenRepository.remove(token);
    }
    return null;

  }

  async findToken() {
  }

  async refreshToken() {
  }
}
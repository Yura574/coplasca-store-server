import { UserService } from '../User/user.service';
import { RegisterDto } from '../../Entity/dto/registerDto';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../Entity/dto/loginDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
              private jwtService: JwtService) {}

  async comparePassword(password: string, userPassword: string) {
    if (!userPassword) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
    const isComparePassword = await bcrypt.compare(
      password,
      userPassword
    );
    if (!isComparePassword) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    const isComparePassword = await this.comparePassword(password, user.password);
    if (user && isComparePassword) {
      user.password = undefined;
      return user;
    }

    return null;

  }

  public async register(registrationData: RegisterDto) {
    const hashPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.createUser({ ...registrationData, password: hashPassword });

      console.log('created user', createdUser);
      // createdUser.password = undefined;

      return createdUser;
    } catch (error) {
      throw new HttpException(`${error.response}`, HttpStatus.BAD_REQUEST);
    }
  }

  public async loginUser(user: LoginDto) {
    const payload = { email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, { expiresIn: '7d' }),
      email: user.email,
    };

  }


  async refreshToken(user: any) {
    const payload = { email: user.email };
    return {
      refresh_token: await this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    };
  }

  public getCookieWithJwtAccessToken(email: string) {
    console.log( process.env.JWT_EXP_H);
    const payload = { email };
    const token = this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '20m'
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXP_H}`;
  }

  public getCookieWithJwtRefreshToken(email: string) {
    const payload= { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: `${process.env.JWT_EXP_D}`
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXP_D}`;
    return {
      cookie,
      token
    }
  }


}

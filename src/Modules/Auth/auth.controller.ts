import {Body, Controller, Post, Req, Request, Res, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDto} from '../../Entity/dto/registerDto';
import {LoginDto} from '../../Entity/dto/loginDto';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {RefreshAuthGuard} from './guards/refresh-auth.guard';
import {UserService} from '../User/user.service';
import {UserCreateDto} from '../../Entity/dto/userCreateDto';


@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService,
                private userService: UserService) {
    }

    @Post('sing-up')
    registerUser(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }
    //
    @Post('sing-in')
    loginUser(@Body() loginDto: LoginDto) {
      return this.authService.loginUser(loginDto);
    }
    //

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
      console.log(req.user);
      console.log(`[AuthController] login`);
      return this.authService.loginUser(req.user);
    }
    //
    // @UseGuards(LocalAuthGuard)
    // @Post('log-in')
    // async logIn(@Req() request: any) {
    //   const { user } = request;
    //   const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.email);
    //   const refreshTokenCookie = this.authService.getCookieWithJwtRefreshToken(user.email);
    //
    //   await this.userService.setCurrentRefreshToken(refreshTokenCookie.token, user.id);
    //
    //   request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    //   console.log(request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]))
    //   return user;
    // }
    //
    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    async refreshToken(@Request() req: any) {
      return await this.authService.refreshToken(req.user);
    }

    @Post('singOut')
    async singOut(@Req() req: any) {
    }

    @Post('activate')
    async activateLink(){}
}

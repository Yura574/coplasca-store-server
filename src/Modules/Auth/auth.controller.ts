import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../../Entity/dto/registerDto';
import { LocalAuthenticationGuard } from './auth.guard';


@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
   registerUser (@Body() registerDto: RegisterDto ){
  return this.authService.register(registerDto)
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: any) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}

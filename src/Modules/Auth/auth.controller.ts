import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../../Entity/dto/registerDto';


@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserInputModel } from '../../../users/api/models/input/createUser.input.model';
import { AuthService } from '../../application/auth.service';
import { ConfirmationCodeInputModel } from './input/confirmationCode.input.model';
import { LoginInputModel } from './input/login.input.model';
import { Response } from 'express';
import { RecoveryPasswordInputModel } from './input/recoveryPassword.input.model';
import { NewPasswordInputModel } from './input/newPassword.input.model';
import { ResendingEmailInputModel } from './input/resendingEmail.input.model';
import { AuthGuard } from '../../../../infrastructure/guards/auth.guard';
import { RequestType } from '../../../1_commonTypes/commonTypes';
import { RegistrationUseCase } from '../../application/useCases/registration.use-case';
import { EmailConfirmationUseCase } from '../../application/useCases/emailConfirmation.use-case';
import { LoginUseCase } from '../../application/useCases/login.use-case';
import { RecoveryPasswordUseCase } from '../../application/useCases/recoveryPassword.use-case';
import { NewPasswordUseCase } from '../../application/useCases/newPassword.use-case';
import { LoginOutputModel } from './output/login.output.model';
import { UserViewModel } from '../../../users/api/models/output/createdUser.output.model';
import { ResendingEmailUseCase } from '../../application/useCases/resendingEmail.use-case';
import { RefreshTokenGuard } from '../../../../infrastructure/guards/refreshToken.guard';
import { RefreshTokenUseCase } from '../../application/useCases/refreshToken.use-case';
import { MeUseCase } from '../../application/useCases/me.use-case';

export enum authEndPoints {
  BASE = 'auth',
  REGISTRATION = 'registration',
  REGISTRATION_CONFIRMATION = 'registration-confirmation',
  LOGIN = 'login',
  REFRESH_TOKEN = 'refresh-token',
  RECOVERY_PASSWORD = 'recovery-password',
  NEW_PASSWORD = 'new-password',
  REGISTRATION_EMAIL_RESENDING = 'registration-email-resending',
  ME = 'me',
  LOGOUT = 'logout',
}

@Controller(authEndPoints.BASE)
export class AuthController {
  constructor(
    private authService: AuthService,
    private registrationUseCase: RegistrationUseCase,
    private emailConfirmation: EmailConfirmationUseCase,
    private loginUseCase: LoginUseCase,
    private recoveryPasswordUseCase: RecoveryPasswordUseCase,
    private newPasswordUseCase: NewPasswordUseCase,
    private resendingEmailUseCase: ResendingEmailUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
    private meUseCase: MeUseCase,
  ) {}

  @Post(authEndPoints.REGISTRATION)
  @HttpCode(HttpStatus.NO_CONTENT)
  async registration(
    @Body() body: UserInputModel,
  ): Promise<UserViewModel | void> {
    return await this.registrationUseCase.execution(body);
  }

  @Post(authEndPoints.REGISTRATION_CONFIRMATION)
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(@Body() body: ConfirmationCodeInputModel) {
    return await this.emailConfirmation.execute(body.code);
  }

  @Post(authEndPoints.LOGIN)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginInputModel,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginOutputModel> {
    const { loginOrEmail, password } = body;
    console.log(body);
    const cookie = await this.loginUseCase.execute(
      loginOrEmail.toLowerCase(),
      password,
    );

    const accessToken = {
      accessToken: cookie.accessCookie,
    };

    res.cookie('refreshToken', cookie.refreshCookie, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return accessToken;
  }

  @Post(authEndPoints.LOGOUT)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }

  @Post(authEndPoints.RECOVERY_PASSWORD)
  @HttpCode(HttpStatus.NO_CONTENT)
  async recoveryPassword(@Body() body: RecoveryPasswordInputModel) {
    return await this.recoveryPasswordUseCase.execute(body.email);
  }

  @Post(authEndPoints.NEW_PASSWORD)
  @HttpCode(HttpStatus.NO_CONTENT)
  async newPassword(@Body() body: NewPasswordInputModel) {
    return await this.newPasswordUseCase.execute(body);
  }

  @Post(authEndPoints.REGISTRATION_EMAIL_RESENDING)
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendingEmail(@Body() body: ResendingEmailInputModel) {
    return await this.resendingEmailUseCase.execute(body.email);
  }

  @UseGuards(RefreshTokenGuard)
  @Post(authEndPoints.REFRESH_TOKEN)
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() req: RequestType<{}, {}, {}>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;
    if (!user) {
      return;
    }
    const cookie = await this.refreshTokenUseCase.execute(user);
    const accessToken = {
      accessToken: cookie.accessCookie,
    };

    res.cookie('refreshToken', cookie.refreshCookie, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return accessToken;
  }

  @UseGuards(RefreshTokenGuard)
  @Get(authEndPoints.ME)
  async me(@Req() req: RequestType<{}, {}, {}>,
           @Res({ passthrough: true }) res: Response,) {
    const user = req.user;
    console.log(user);
    if (!user) throw new UnauthorizedException();
    const findUser = await this.meUseCase.execute(user);
    if (!findUser) {
      res.clearCookie('refreshToken');
      return;
    }

    return user;
  }
}

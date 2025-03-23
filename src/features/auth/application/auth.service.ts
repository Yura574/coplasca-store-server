import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { EmailService } from './email.service';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { RecoveryPasswordService } from './recoveryPassword.service';

@Injectable()
export class AuthService {
  constructor(private userRepository: UsersRepository,
              private recoveryPasswordService: RecoveryPasswordService,
              private emailService: EmailService) {
  }

}
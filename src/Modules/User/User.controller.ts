import { Controller } from '@nestjs/common';
import { UserService } from './User.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
}

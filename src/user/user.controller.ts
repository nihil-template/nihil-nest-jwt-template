import { Controller } from '@nestjs/common';
import { UserService } from '@/user/user.service';

@Controller('user')
export class UserController {
  // eslint-disable-next-line no-unused-vars
  constructor(private userService: UserService) {}
}

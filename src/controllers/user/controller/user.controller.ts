import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/controllers/auth/jwt.auth.guard';
import { mapToHttpException } from 'src/exceptions/ToHttpException';
import { UserService } from '../service/interface/IUserService';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAll() {
    return mapToHttpException(this.userService.getAll());
  }
}

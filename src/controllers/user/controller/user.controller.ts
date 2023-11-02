import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/controllers/auth/jwt.auth.guard';
import { UserService } from '../service/interface/IUserService';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }
}

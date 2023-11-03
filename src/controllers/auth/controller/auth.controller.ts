import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/interface/IAuthService';
import { CreateUserDto } from '../types/CreateUserDto';
import { LoginUserDto } from '../types/LoginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}

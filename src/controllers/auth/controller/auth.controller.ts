import { Body, Controller, Post } from '@nestjs/common';
import { mapToHttpException } from 'src/exceptions/ToHttpException';
import { AuthService } from '../service/interface/IAuthService';
import { CreateUserDto } from '../types/CreateUserDto';
import { LoginUserDto } from '../types/LoginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return mapToHttpException(this.authService.register(createUserDto));
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return mapToHttpException(this.authService.login(loginUserDto));
  }
}

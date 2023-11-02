import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/interface/IAuthService';
import { ICreateUserDto } from '../types/ICreateUserDto';
import { ILoginUserDto } from '../types/ILoginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: ICreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: ILoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}

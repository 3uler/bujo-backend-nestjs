import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistence/prisma/prisma.service';
import { ICreateUserDto } from '../types/ICreateUserDto';
import { ILoginUserDto } from '../types/ILoginUserDto';
import { IAuthService } from './interface/IAuthService';

@Injectable()
export class PrismaAuthService implements IAuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(createUserDto: ICreateUserDto) {
    const user = await this.prismaService.user.create(createUserDto);
    return user;
  }

  async login(loginUserDto: ILoginUserDto) {
    const user = await this.prismaService.user.findByEmail(loginUserDto.email);
    return user;
  }
}

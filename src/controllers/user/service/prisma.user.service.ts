import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/controllers/auth/types/CreateUserDto';
import { PrismaService } from 'src/persistence/prisma/prisma.service';
import { IUserService } from './interface/IUserService';

@Injectable()
export class PrismaUserService implements IUserService {
  constructor(private readonly prismaService: PrismaService) {}
  create(user: CreateUserDto) {
    return this.prismaService.user.create(user);
  }
  async findByEmail(email: string) {
    return this.prismaService.user.findByEmail(email);
  }

  async findById(id: string) {
    return this.prismaService.user.findById(id);
  }

  async getAll() {
    return this.prismaService.user.getAll();
  }
}

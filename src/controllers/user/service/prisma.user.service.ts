import { Injectable } from '@nestjs/common';
import { fromNullable } from 'fp-ts/lib/Option';
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
    const user = await this.prismaService.user.findByEmail(email);
    return fromNullable(user);
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findById(id);
    return fromNullable(user);
  }

  async getAll() {
    return this.prismaService.user.getAll();
  }
}

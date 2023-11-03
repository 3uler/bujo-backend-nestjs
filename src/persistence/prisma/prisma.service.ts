import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/controllers/auth/types/CreateUserDto';

const prisma = new PrismaClient();
@Injectable()
export class PrismaService implements OnModuleDestroy {
  constructor() {}
  user = {
    findById: (id: string) => prisma.user.findUnique({ where: { id } }),
    findByEmail: (email: string) =>
      prisma.user.findUnique({ where: { email } }),
    create: (user: CreateUserDto) => prisma.user.create({ data: user }),
    getAll: () => prisma.user.findMany(),
  };

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}

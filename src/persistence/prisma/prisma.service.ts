import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ICreateUserDto } from 'src/controllers/auth/types/ICreateUserDto';

const prisma = new PrismaClient();
@Injectable()
export class PrismaService implements OnModuleDestroy {
  constructor() {}
  user = {
    findByEmail: (email: string) =>
      prisma.user.findUnique({ where: { email } }),
    create: (user: ICreateUserDto) => prisma.user.create({ data: user }),
  };

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}

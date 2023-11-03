import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Option, fromNullable } from 'fp-ts/lib/Option';
import { CreateUserDto } from 'src/controllers/auth/types/CreateUserDto';
import { IPersistedUser } from 'src/controllers/auth/types/IPersistedUser';
import { InternalException } from 'src/exceptions/InternalException';

const prisma = new PrismaClient();
@Injectable()
export class PrismaService implements OnModuleDestroy {
  constructor() {}
  user = {
    findById: async (id: string): Promise<Option<IPersistedUser>> =>
      fromNullable(await prisma.user.findUnique({ where: { id } })),
    findByEmail: async (email: string): Promise<Option<IPersistedUser>> =>
      fromNullable(await prisma.user.findUnique({ where: { email } })),
    create: async (user: CreateUserDto): Promise<IPersistedUser> => {
      try {
        return await prisma.user.create({ data: user });
      } catch (e) {
        throw new InternalException('DuplicateEntity', 'Email already exists');
      }
    },
    getAll: (): Promise<IPersistedUser[]> => prisma.user.findMany(),
  };

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}

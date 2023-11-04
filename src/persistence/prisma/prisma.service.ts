import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as O from 'fp-ts/lib/Option';
import * as T from 'fp-ts/lib/Task';
import { tryCatchK } from 'fp-ts/lib/TaskEither';
import * as TO from 'fp-ts/lib/TaskOption';
import { pipe } from 'fp-ts/lib/function';
import { CreateUserDto } from 'src/controllers/auth/types/CreateUserDto';
import { IPersistedUser } from 'src/controllers/auth/types/IPersistedUser';
import { InternalException } from 'src/exceptions/InternalException';
import { TaskPotential } from 'src/types/Potential';

const prisma = new PrismaClient();
@Injectable()
export class PrismaService implements OnModuleDestroy {
  constructor() {}
  user = {
    findById: (id: string): TO.TaskOption<IPersistedUser> =>
      pipe(
        () => prisma.user.findUnique({ where: { id } }),
        T.map(O.fromNullable),
      ),
    findByEmail: (email: string): TO.TaskOption<IPersistedUser> =>
      pipe(
        () => prisma.user.findUnique({ where: { email } }),
        T.map(O.fromNullable),
      ),
    create: (user: CreateUserDto): TaskPotential<IPersistedUser> => {
      return tryCatchK(
        () => prisma.user.create({ data: user }),
        () => new InternalException('DuplicateEntity', 'Email already exists'),
      )();
    },
    getAll: (): Promise<IPersistedUser[]> => prisma.user.findMany(),
  };

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}

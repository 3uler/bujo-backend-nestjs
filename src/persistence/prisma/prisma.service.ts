import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as O from 'fp-ts/lib/Option';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { fromEither, tryCatchK } from 'fp-ts/lib/TaskEither';
import * as TO from 'fp-ts/lib/TaskOption';
import { pipe } from 'fp-ts/lib/function';
import { CreateUserDto } from 'src/controllers/auth/types/CreateUserDto';
import { IPersistedUser } from 'src/controllers/auth/types/IPersistedUser';
import { fromDto } from 'src/controllers/entry/types/CreateEntry';
import { CreateEntryDto } from 'src/controllers/entry/types/CreateEntryDto';
import { IEntry } from 'src/controllers/entry/types/IEntry';
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

  entry = {
    create: (userId: string, entry: CreateEntryDto): TaskPotential<IEntry> => {
      return pipe(
        entry,
        fromDto,
        fromEither,
        TE.flatMap((e) =>
          tryCatchK(
            () => prisma.entry.create({ data: { ...e, userId } }),
            (error) => {
              console.error(error);
              return new InternalException(
                'Unknown',
                'Could not create new entry',
                error,
              );
            },
          )(),
        ),
      );
    },
    update: (
      userId: string,
      id: string,
      entry: CreateEntryDto,
    ): TaskPotential<IEntry> => {
      return pipe(
        entry,
        fromDto,
        fromEither,
        TE.flatMap((e) =>
          tryCatchK(
            () => prisma.entry.update({ where: { id, userId }, data: e }),
            (error) =>
              new InternalException('Unknown', 'Could not update entry', error),
          )(),
        ),
      );
    },
    delete: (userId: string, id: string): TaskPotential<IEntry> => {
      return tryCatchK(
        () => prisma.entry.delete({ where: { id, userId } }),
        () =>
          new InternalException(
            'MissingEntity',
            'Entity with given id not found',
          ),
      )();
    },
    find: (userId: string, from: Date, to: Date): TaskPotential<IEntry[]> => {
      return tryCatchK(
        () =>
          prisma.entry.findMany({
            where: {
              userId,
              date: {
                gte: from,
                lte: to,
              },
            },
          }),
        (error) =>
          new InternalException('Unknown', 'Could not retrieve entries', error),
      )();
    },
  };

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}

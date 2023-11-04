import { TaskOption } from 'fp-ts/lib/TaskOption';
import { CreateUserDto } from 'src/controllers/auth/types/CreateUserDto';
import { TaskPotential } from 'src/types/Potential';
import { IPersistedUser } from '../../../auth/types/IPersistedUser';

export interface IUserService {
  create: (user: CreateUserDto) => TaskPotential<IPersistedUser>;
  findById: (userId: string) => TaskOption<IPersistedUser>;
  findByEmail: (email: string) => TaskOption<IPersistedUser>;
  getAll: () => Promise<IPersistedUser[]>;
}

export abstract class UserService implements IUserService {
  abstract create: (user: CreateUserDto) => TaskPotential<IPersistedUser>;
  abstract findByEmail: (email: string) => TaskOption<IPersistedUser>;
  abstract findById: (userId: string) => TaskOption<IPersistedUser>;
  abstract getAll: () => Promise<IPersistedUser[]>;
}

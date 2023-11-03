import { Option } from 'fp-ts/lib/Option';
import { CreateUserDto } from 'src/controllers/auth/types/CreateUserDto';
import { IPersistedUser } from '../../../auth/types/IPersistedUser';

export interface IUserService {
  create: (user: CreateUserDto) => Promise<IPersistedUser>;
  findById: (userId: string) => Promise<Option<IPersistedUser>>;
  findByEmail: (email: string) => Promise<Option<IPersistedUser>>;
  getAll: () => Promise<IPersistedUser[]>;
}

export abstract class UserService implements IUserService {
  abstract create: (user: CreateUserDto) => Promise<IPersistedUser>;
  abstract findByEmail: (email: string) => Promise<Option<IPersistedUser>>;
  abstract findById: (userId: string) => Promise<Option<IPersistedUser>>;
  abstract getAll: () => Promise<IPersistedUser[]>;
}

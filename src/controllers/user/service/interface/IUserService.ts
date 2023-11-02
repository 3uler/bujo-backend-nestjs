import { Option } from 'fp-ts/lib/Option';
import { ICreateUserDto } from '../../../auth/types/ICreateUserDto';
import { IPersistedUser } from '../../../auth/types/IPersistedUser';

export interface IUserService {
  create: (user: ICreateUserDto) => Promise<IPersistedUser>;
  findById: (userId: string) => Promise<Option<IPersistedUser>>;
  findByEmail: (email: string) => Promise<Option<IPersistedUser>>;
}

export abstract class UserService implements IUserService {
  abstract create: (user: ICreateUserDto) => Promise<IPersistedUser>;
  abstract findByEmail: (email: string) => Promise<Option<IPersistedUser>>;
  abstract findById: (userId: string) => Promise<Option<IPersistedUser>>;
}

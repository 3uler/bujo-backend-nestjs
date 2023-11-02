import { ICreateUserDto } from 'src/controllers/auth/types/ICreateUserDto';
import { ILoginUserDto } from 'src/controllers/auth/types/ILoginUserDto';
import { IUserResponseDto } from 'src/controllers/auth/types/IUserResponseDto';
import { IAuthEntity } from '../../types/IAuthEntity';

export interface IAuthService {
  register: (user: ICreateUserDto) => Promise<IUserResponseDto>;
  login: (user: ILoginUserDto) => Promise<IAuthEntity>;
}

export abstract class AuthService implements IAuthService {
  abstract login: (user: ILoginUserDto) => Promise<IAuthEntity>;
  abstract register: (user: ICreateUserDto) => Promise<IUserResponseDto>;
}

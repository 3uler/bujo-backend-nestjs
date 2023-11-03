import { IUserResponseDto } from 'src/controllers/auth/types/IUserResponseDto';
import { CreateUserDto } from '../../types/CreateUserDto';
import { IAuthEntity } from '../../types/IAuthEntity';
import { LoginUserDto } from '../../types/LoginUserDto';

export interface IAuthService {
  register: (user: CreateUserDto) => Promise<IUserResponseDto>;
  login: (user: LoginUserDto) => Promise<IAuthEntity>;
}

export abstract class AuthService implements IAuthService {
  abstract login: (user: LoginUserDto) => Promise<IAuthEntity>;
  abstract register: (user: CreateUserDto) => Promise<IUserResponseDto>;
}

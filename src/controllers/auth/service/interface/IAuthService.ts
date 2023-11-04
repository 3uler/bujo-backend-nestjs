import { IUserResponseDto } from 'src/controllers/auth/types/IUserResponseDto';
import { TaskPotential } from 'src/types/Potential';
import { CreateUserDto } from '../../types/CreateUserDto';
import { IAuthEntity } from '../../types/IAuthEntity';
import { LoginUserDto } from '../../types/LoginUserDto';

export interface IAuthService {
  register: (user: CreateUserDto) => TaskPotential<IUserResponseDto>;
  login: (user: LoginUserDto) => TaskPotential<IAuthEntity>;
}

export abstract class AuthService implements IAuthService {
  abstract login: (user: LoginUserDto) => TaskPotential<IAuthEntity>;
  abstract register: (user: CreateUserDto) => TaskPotential<IUserResponseDto>;
}

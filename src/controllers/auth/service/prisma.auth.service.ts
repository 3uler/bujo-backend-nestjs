import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/persistence/prisma/prisma.service';
import { ICreateUserDto } from '../types/ICreateUserDto';
import { ILoginUserDto } from '../types/ILoginUserDto';
import { IPersistedUser } from '../types/IPersistedUser';
import { IUserResponseDto } from '../types/IUserResponseDto';
import { IAuthService } from './interface/IAuthService';

@Injectable()
export class PrismaAuthService implements IAuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(createUserDto: ICreateUserDto) {
    const userToCreate = await toUserWithHashedPassword(createUserDto);
    try {
      const persistedUser = await this.prismaService.user.create(userToCreate);
      return toUserResponse(persistedUser);
    } catch (e) {
      throw new ConflictException('Email already exists.');
    }
  }

  async login(loginUserDto: ILoginUserDto) {
    const user = await this.prismaService.user.findByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException(
        `User not found for email: ${loginUserDto.email}`,
      );
    }
    const passwordIsValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return toUserResponse(user);
  }
}

const toUserWithHashedPassword = async (
  user: ICreateUserDto,
): Promise<ICreateUserDto> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return { ...user, password: hashedPassword };
};

const toUserResponse = (user: IPersistedUser): IUserResponseDto => {
  return {
    email: user.email,
    id: user.id,
    name: user.name,
  };
};

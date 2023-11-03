import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/persistence/prisma/prisma.service';
import { CreateUserDto } from '../types/CreateUserDto';
import { ITokenPayload } from '../types/IAuthEntity';
import { IPersistedUser } from '../types/IPersistedUser';
import { IUserResponseDto } from '../types/IUserResponseDto';
import { LoginUserDto } from '../types/LoginUserDto';
import { IAuthService } from './interface/IAuthService';

@Injectable()
export class PrismaAuthService implements IAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const userToCreate = await toUserWithHashedPassword(createUserDto);
    try {
      const persistedUser = await this.prismaService.user.create(userToCreate);
      return toUserResponse(persistedUser);
    } catch (e) {
      throw new ConflictException('Email already exists.');
    }
  }

  async login(loginUserDto: LoginUserDto) {
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
    const payload: ITokenPayload = {
      userId: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

const toUserWithHashedPassword = async (
  user: CreateUserDto,
): Promise<CreateUserDto> => {
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

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as TE from 'fp-ts/lib/TaskEither';
import * as TO from 'fp-ts/lib/TaskOption';
import { pipe } from 'fp-ts/lib/function';
import { InternalException } from 'src/exceptions/InternalException';
import { PrismaService } from 'src/persistence/prisma/prisma.service';
import { TaskPotential } from 'src/types/Potential';
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

  register(createUserDto: CreateUserDto) {
    return pipe(
      createUserDto,
      toUserWithHashedPassword,
      TE.flatMap(this.prismaService.user.create),
      TE.map(toUserResponse),
    );
  }

  login(loginUserDto: LoginUserDto) {
    const persistedUser = pipe(
      TO.of(loginUserDto.email),
      TO.flatMap(this.prismaService.user.findByEmail),
      TE.fromTaskOption(toMissingUserException(loginUserDto.email)),
    );

    const validatedUser = pipe(
      persistedUser,
      TE.flatMap(validatePassword(loginUserDto.password)),
    );

    return pipe(
      validatedUser,
      TE.map(userToJwtPayload),
      TE.map(generateToken(this.jwtService)),
    );
  }
}

const generateToken = (jwtService: JwtService) => (payload: ITokenPayload) => {
  const accessToken = jwtService.sign(payload);
  return { accessToken };
};

const userToJwtPayload = (user: IPersistedUser): ITokenPayload => {
  return {
    userId: user.id,
  };
};
const validatePassword =
  (passwordInput: string) => (persistedUser: IPersistedUser) => {
    const passwordIsValid = TE.tryCatchK(
      () => bcrypt.compare(passwordInput, persistedUser.password),
      (e) => new InternalException('Unknown', 'Password comparison failed', e),
    )();
    return pipe(
      passwordIsValid,
      TE.flatMap((isValid) => {
        return isValid
          ? TE.right(persistedUser)
          : TE.left(
              new InternalException('InvalidPassword', 'Invalid password.'),
            );
      }),
    );
  };

const toMissingUserException = (email: string) => () => {
  return new InternalException(
    'MissingEntity',
    `User not found for email: ${email}`,
  );
};

const toUserWithHashedPassword = (
  user: CreateUserDto,
): TaskPotential<CreateUserDto> => {
  return pipe(
    user.password,
    hashPassword,
    TE.map(construcUserFromHashedPassword(user)),
  );
};

const hashPassword = (password: string): TaskPotential<string> => {
  return TE.tryCatchK(
    () => bcrypt.hash(password, 10),
    (e) => new InternalException('Unknown', 'Password hashing failed', e),
  )();
};

const construcUserFromHashedPassword =
  (user: CreateUserDto) =>
  (hashedPwd: string): CreateUserDto => {
    return { ...user, password: hashedPwd };
  };

const toUserResponse = (user: IPersistedUser): IUserResponseDto => {
  return {
    email: user.email,
    id: user.id,
    name: user.name,
  };
};

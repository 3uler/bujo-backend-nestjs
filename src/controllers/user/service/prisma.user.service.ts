import { fromNullable } from 'fp-ts/lib/Option';
import { ICreateUserDto } from 'src/controllers/auth/types/ICreateUserDto';
import { PrismaService } from 'src/persistence/prisma/prisma.service';
import { IUserService } from './interface/IUserService';

export class PrismaUserService implements IUserService {
  constructor(private readonly prismaService: PrismaService) {}
  create(user: ICreateUserDto) {
    return this.prismaService.user.create(user);
  }
  async findByEmail(email: string) {
    const user = await this.prismaService.user.findByEmail(email);
    return fromNullable(user);
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findById(id);
    return fromNullable(user);
  }
}

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/persistence/prisma/prisma.module';
import { UserService } from './service/interface/IUserService';
import { PrismaUserService } from './service/prisma.user.service';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: UserService, useClass: PrismaUserService }],
  exports: [UserService],
})
export class UserModule {}

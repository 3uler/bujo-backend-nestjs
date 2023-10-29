import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/persistence/prisma/prisma.module';
import { AuthService } from './service/interface/IAuthService';
import { PrismaAuthService } from './service/prisma.auth.service';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: AuthService, useClass: PrismaAuthService }],
  exports: [AuthService],
})
export class AuthModule {}

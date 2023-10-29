import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { PrismaModule } from 'src/persistence/prisma/prisma.module';
import { AuthService } from './service/interface/IAuthService';
import { PrismaAuthService } from './service/prisma.auth.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: env['JWT_SECRET'],
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [{ provide: AuthService, useClass: PrismaAuthService }],
  exports: [AuthService],
})
export class AuthModule {}

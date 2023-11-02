import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process';
import { PrismaModule } from 'src/persistence/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './service/interface/IAuthService';
import { PrismaAuthService } from './service/prisma.auth.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: env['JWT_SECRET'],
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  providers: [
    { provide: AuthService, useClass: PrismaAuthService },
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

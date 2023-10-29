import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { AuthController } from './controllers/auth/controller/auth.controller';
import { PrismaAuthService } from './controllers/auth/service/prisma.auth.service';
import { PrismaModule } from './persistence/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaAuthService],
})
export class AppModule {}

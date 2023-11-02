import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { AuthController } from './controllers/auth/controller/auth.controller';
import { UserModule } from './controllers/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}

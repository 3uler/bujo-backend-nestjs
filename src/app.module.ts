import { Module } from '@nestjs/common';
import { AuthModule } from './controllers/auth/auth.module';
import { EntryModule } from './controllers/entry/entry.module';
import { UserModule } from './controllers/user/user.module';

@Module({
  imports: [AuthModule, UserModule, EntryModule],
})
export class AppModule {}

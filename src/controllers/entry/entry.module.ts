import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/persistence/prisma/prisma.module';
import { EntryController } from './controller/entry.controller';
import { EntryService } from './service/interface/IEntryService';
import { PrismaEntryService } from './service/prisma.entry.service';

@Module({
  controllers: [EntryController],
  imports: [PrismaModule],
  providers: [{ provide: EntryService, useClass: PrismaEntryService }],
})
export class EntryModule {}

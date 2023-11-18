import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistence/prisma/prisma.service';
import { CreateEntryDto } from '../types/CreateEntryDto';
import { IEntryService } from './interface/IEntryService';

@Injectable()
export class PrismaEntryService implements IEntryService {
  constructor(private readonly prismaService: PrismaService) {}
  create(entry: CreateEntryDto) {
    return this.prismaService.entry.create(entry);
  }
  delete(id: string) {
    return this.prismaService.entry.delete(id);
  }
  find(from: Date, to: Date) {
    return this.prismaService.entry.find(from, to);
  }
  update(id: string, entry: CreateEntryDto) {
    return this.prismaService.entry.update(id, entry);
  }
}

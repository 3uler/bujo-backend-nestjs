import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistence/prisma/prisma.service';
import { CreateEntryDto } from '../types/CreateEntryDto';
import { IEntryService } from './interface/IEntryService';

@Injectable()
export class PrismaEntryService implements IEntryService {
  constructor(private readonly prismaService: PrismaService) {}
  forUser(userId: string) {
    return {
      create: (entry: CreateEntryDto) =>
        this.prismaService.entry.create(userId, entry),
      delete: (id: string) => this.prismaService.entry.delete(userId, id),
      find: (from: Date, to: Date) =>
        this.prismaService.entry.find(userId, from, to),
      update: (id: string, entry: CreateEntryDto) =>
        this.prismaService.entry.update(userId, id, entry),
    };
  }
}

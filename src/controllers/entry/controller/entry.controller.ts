import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { unwrapTP } from 'src/controllers/utils/ControllerUtils';
import { EntryService } from '../service/interface/IEntryService';
import { CreateEntryDto } from '../types/CreateEntryDto';
import { FindEntryQuery } from './types/FindEntryQuery';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  async create(@Body() createEntryDto: CreateEntryDto) {
    return unwrapTP(this.entryService.create(createEntryDto));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() entry: CreateEntryDto) {
    return unwrapTP(this.entryService.update(id, entry));
  }

  @Get()
  async find(@Query() query: FindEntryQuery) {
    const from = dayjs(query.from).toDate();
    const to = dayjs(query.to).toDate();
    return unwrapTP(this.entryService.find(from, to));
  }
}

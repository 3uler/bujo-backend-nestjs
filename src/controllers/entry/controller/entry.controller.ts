import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import { JwtAuthGuard } from 'src/controllers/auth/jwt.auth.guard';
import { RequestWithUser } from 'src/controllers/types/RequestWithUser';
import { unwrapTP } from 'src/controllers/utils/ControllerUtils';
import { EntryService } from '../service/interface/IEntryService';
import { CreateEntryDto } from '../types/CreateEntryDto';
import { FindEntryQuery } from './types/FindEntryQuery';

@Controller('entry')
@UseGuards(JwtAuthGuard)
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  async create(
    @Body() createEntryDto: CreateEntryDto,
    @Req() req: RequestWithUser,
  ) {
    return unwrapTP(
      this.entryService.forUser(req.user.id).create(createEntryDto),
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() entry: CreateEntryDto,
    @Req() req: RequestWithUser,
  ) {
    return unwrapTP(this.entryService.forUser(req.user.id).update(id, entry));
  }

  @Get()
  async find(@Query() query: FindEntryQuery, @Req() req: RequestWithUser) {
    const from = DateTime.fromISO(query.from, { zone: 'utc' }).toJSDate();
    const to = DateTime.fromISO(query.to, { zone: 'utc' }).toJSDate();
    return unwrapTP(this.entryService.forUser(req.user.id).find(from, to));
  }
}

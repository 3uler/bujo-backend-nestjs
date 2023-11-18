import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EntryDateTime } from './EntryDateTime';
import EntryStatus from './EntryStatus';
import EntryType from './EntryType';

export class CreateEntryDto {
  @IsNotEmpty()
  @IsEnum(EntryType)
  readonly type: EntryType;

  @IsNotEmpty()
  @IsEnum(EntryStatus)
  readonly status: EntryStatus;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  readonly dateTime: EntryDateTime;

  @IsNotEmpty()
  readonly children: SubEntry[];
}

export class SubEntry {
  @IsEnum(EntryType)
  @IsNotEmpty()
  readonly type: EntryType;

  @IsNotEmpty()
  @IsEnum(EntryStatus)
  readonly status: EntryStatus;

  @IsNotEmpty()
  @IsString()
  readonly text: string;
}

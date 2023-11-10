import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import EntryStatus from './EntryStatus';
import EntryType from './EntryType';

export class CreateEntryDto {
  @IsEnum(EntryType)
  @IsNotEmpty()
  readonly type: EntryType;

  @IsEnum(EntryStatus)
  readonly status?: EntryStatus;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  readonly dateTime: EntryDateTime;

  readonly children: SubEntry[];
}

export class SubEntry {
  @IsEnum(EntryType)
  @IsNotEmpty()
  readonly type: EntryType;

  @IsEnum(EntryStatus)
  readonly status?: EntryStatus;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  readonly children: SubEntry[];
}

export class EntryDateTime {
  @IsNotEmpty()
  @IsInt()
  @Min(2023)
  @Max(2050)
  readonly year: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  readonly month: number;

  @IsInt()
  @Min(1)
  @Max(31)
  readonly day?: number;

  readonly time: EntryTime;
}

export class EntryTime {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(23)
  readonly hour: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(59)
  readonly minute: number;
}

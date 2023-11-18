import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { EntryTime } from './EntryTime';

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

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(31)
  readonly day: number | null;

  @IsNotEmpty()
  readonly time: EntryTime | null;
}

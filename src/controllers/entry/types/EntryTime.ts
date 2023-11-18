import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

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

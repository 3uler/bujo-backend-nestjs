import { IsDateString, IsNotEmpty } from 'class-validator';

export class FindEntryQuery {
  @IsNotEmpty()
  @IsDateString()
  readonly from: string;

  @IsNotEmpty()
  @IsDateString()
  readonly to: string;
}

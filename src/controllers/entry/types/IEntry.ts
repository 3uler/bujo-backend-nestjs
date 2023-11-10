import { EntryDateTime, SubEntry } from './CreateEntryDto';
import EntryStatus from './EntryStatus';
import EntryType from './EntryType';

export interface IEntry {
  id: string;
  type: EntryType;
  status: EntryStatus | undefined;
  text: string;
  dateTime: EntryDateTime;
  children: SubEntry[];
}

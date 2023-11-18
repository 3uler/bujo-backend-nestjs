import { SubEntry } from './CreateEntryDto';
import { EntryDateTime } from './EntryDateTime';
import EntryStatus from './EntryStatus';
import EntryType from './EntryType';

export interface IEntry {
  id: string;
  type: EntryType;
  status: EntryStatus;
  text: string;
  dateTime: EntryDateTime;
  children: SubEntry[];
}

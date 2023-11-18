import { TaskPotential } from 'src/types/Potential';
import { CreateEntryDto } from '../../types/CreateEntryDto';
import { IEntry } from '../../types/IEntry';

export interface IEntryService {
  create: (entry: CreateEntryDto) => TaskPotential<IEntry>;
  update: (id: string, entry: CreateEntryDto) => TaskPotential<IEntry>;
  delete: (id: string) => TaskPotential<IEntry>;
  find: (from: Date, to: Date) => TaskPotential<IEntry[]>;
}

export abstract class EntryService implements IEntryService {
  abstract create: (entry: CreateEntryDto) => TaskPotential<IEntry>;
  abstract update: (id: string, entry: CreateEntryDto) => TaskPotential<IEntry>;
  abstract delete: (id: string) => TaskPotential<IEntry>;
  abstract find: (from: Date, to: Date) => TaskPotential<IEntry[]>;
}

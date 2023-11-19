import { TaskPotential } from 'src/types/Potential';
import { CreateEntryDto } from '../../types/CreateEntryDto';
import { IEntry } from '../../types/IEntry';

export interface IEntryService {
  forUser: (userId: string) => IEntryForUserService;
}
export interface IEntryForUserService {
  create: (entry: CreateEntryDto) => TaskPotential<IEntry>;
  update: (id: string, entry: CreateEntryDto) => TaskPotential<IEntry>;
  delete: (id: string) => TaskPotential<IEntry>;
  find: (from: Date, to: Date) => TaskPotential<IEntry[]>;
}

export abstract class EntryService implements IEntryService {
  abstract forUser: (userId: string) => IEntryForUserService;
}

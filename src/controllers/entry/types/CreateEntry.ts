import { CreateEntryDto } from './CreateEntryDto';

export interface ICreateEntry extends CreateEntryDto {
  date: Date;
}

export const fromDto = (createEntryDto: CreateEntryDto): ICreateEntry => {
  return { ...createEntryDto, date: new Date() };
};

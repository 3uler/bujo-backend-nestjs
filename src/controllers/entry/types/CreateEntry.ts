import { left, map, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { DateTime } from 'luxon';
import { InternalException } from 'src/exceptions/InternalException';
import { Potential } from 'src/types/Potential';
import { CreateEntryDto } from './CreateEntryDto';
import { EntryDateTime } from './EntryDateTime';

export interface ICreateEntry extends CreateEntryDto {
  date: Date;
}

export const fromDto = (
  createEntryDto: CreateEntryDto,
): Potential<ICreateEntry> => {
  return pipe(
    createEntryDto.dateTime,
    toDate,
    map((date) => ({ ...createEntryDto, date })),
  );
};

const toDate = (dateTime: EntryDateTime): Potential<Date> => {
  const date = pipe(dateTime, toDateString, parseAsDateTime);
  return date.isValid
    ? right(date.toJSDate())
    : left(
        new InternalException(
          'InvalidArgument',
          'The provided date is not valid',
        ),
      );
};

const parseAsDateTime = (date: string) => DateTime.fromISO(date);

const toDateString = (dateTime: EntryDateTime) => {
  return `${dateTime.year}-${dateTime.month}-${dateTime.day ?? 1}T00:00:00Z`;
};

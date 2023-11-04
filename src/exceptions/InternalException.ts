const EXCEPTION_TYPES = [
  'MissingEntity',
  'InvalidArgument',
  'InvalidPassword',
  'DuplicateEntity',
  'Unknown',
] as const;

export type ExceptionType = (typeof EXCEPTION_TYPES)[any];

export class InternalException {
  constructor(
    readonly type: ExceptionType,
    readonly message: string,
    readonly cause?: any,
  ) {}
}

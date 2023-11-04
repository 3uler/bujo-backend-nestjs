import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InternalException } from './InternalException';

const internalToHttpExceptionMap = {
  DuplicateEntity: ConflictException,
  InvalidArgument: BadRequestException,
  InvalidPassword: UnauthorizedException,
  MissingEntity: NotFoundException,
  Unknown: InternalServerErrorException,
};

export const mapToHttpException = async <T>(fn: T) => {
  try {
    return await fn;
  } catch (e) {
    mapToHttpExceptionAndThrow(e);
    throw e;
  }
};

export const mapToHttpExceptionAndThrow = (e: InternalException) => {
  const exceptionConstructor = internalToHttpExceptionMap[e.type];
  throw new exceptionConstructor(e.message);
};

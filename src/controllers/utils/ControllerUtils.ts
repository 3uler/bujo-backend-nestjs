import * as TE from 'fp-ts/lib/TaskEither';
import { identity, pipe } from 'fp-ts/lib/function';
import { mapToHttpExceptionAndThrow } from 'src/exceptions/ToHttpException';
import { TaskPotential } from 'src/types/Potential';

export const unwrapTP = <T>(serviceCall: TaskPotential<T>) => {
  return pipe(serviceCall, TE.match(mapToHttpExceptionAndThrow, identity))();
};

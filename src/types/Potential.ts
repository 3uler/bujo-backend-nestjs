import { Either } from 'fp-ts/lib/Either';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import { InternalException } from 'src/exceptions/InternalException';

export type Potential<T> = Either<InternalException, T>;

export type TaskPotential<T> = TaskEither<InternalException, T>;

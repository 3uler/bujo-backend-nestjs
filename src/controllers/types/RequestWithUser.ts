import { Request } from 'express';
import { IPersistedUser } from '../auth/types/IPersistedUser';

export type RequestWithUser = Request & { user: IPersistedUser };

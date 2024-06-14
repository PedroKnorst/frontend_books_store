import { IBook } from './books';
import { ISale } from './sale';
import { IUser } from './user';

export interface ISalesperson {
  id: string;
  User: IUser;
  userId: string;
  balance: number;
  Sales: ISale[];
  Books: IBook[];
}

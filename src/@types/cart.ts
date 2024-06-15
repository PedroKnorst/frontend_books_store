import { IBookCart } from './books';
import { ISale } from './sale';

export interface ICart {
  id: string;
  BooksCart: IBookCart[];
  totalPrice: number;
  Sales: ISale[];
  clientId: string;
}

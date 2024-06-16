import { ICart } from './cart';
import { IPayment } from './payment';
import { ISalesperson } from './salesperson';

export interface ISale {
  id: string;
  Cart: ICart;
  cartId: string;
  Payment: IPayment;
  paymentId: string;
  Salesperson: ISalesperson;
  salespersonId: string;
}

export interface ICreateSale {
  paymentId: string;
}

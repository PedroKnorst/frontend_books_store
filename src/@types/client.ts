import { ICart } from "./cart";
import { IPayment } from "./payment";
import { IUser } from "./user";

export interface IClient {
  id: string;
  User: IUser;
  userId: string;
  Payment: IPayment;
  paymentId: string;
  Cart: ICart;
  cartId: string;
}

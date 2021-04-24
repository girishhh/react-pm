import { CartItemInterface } from "./CartItemInterface";
import { CompanyInterface } from "./CompanyInterface";
import { RestaurentInterface } from "./RestaurentInterface";
import { UserInterface } from "./UserInterface";

export interface CartInterface {
  _id: string;
  gst: number;
  grandTotal: number;
  subTotal: number;
  cartItems: CartItemInterface[];
  restaurent: RestaurentInterface | string;
  customer: UserInterface | string;
  company: CompanyInterface | string;
}

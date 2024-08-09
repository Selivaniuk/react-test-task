import { createContext } from "react";

export interface CartProduct {
  productID: number;
  colorID: number;
  sizeID: number;
}
export interface CartItem {
  id: number;
  product: CartProduct;
}

export interface CartContextProps {
  cartItems?: CartItem[];
  addCartItem?: (product: CartProduct) => void;
  removeCartItem?: (cartID: number) => void;
  findCartItem?: (params: {
    id?: number;
    product?: CartProduct;
  }) => CartItem | undefined;
}

export const CartContext = createContext<CartContextProps>({});

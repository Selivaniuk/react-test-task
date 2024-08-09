import { useContext } from "react";

import { CartContext, CartContextProps } from "./CartContext";

const useCart = (): CartContextProps => {
  const { cartItems, addCartItem, removeCartItem, findCartItem } =
    useContext(CartContext);

  return {
    cartItems,
    addCartItem,
    removeCartItem,
    findCartItem,
  };
};

export default useCart;

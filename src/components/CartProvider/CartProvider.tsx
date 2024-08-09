import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CartContext,
  CartContextProps,
  CartItem,
  CartProduct,
} from "./CartContext";

const LOCAL_STORAGE_KEY = "cartItems";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>();

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const addCartItem = useCallback(
    (product: CartProduct) => {
      setCartItems((prev) => {
        const newItem: CartItem = {
          id: prev && prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
          product,
        };

        const updatedCartItems = prev ? [...prev, newItem] : [newItem];
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(updatedCartItems)
        );

        return updatedCartItems;
      });
    },
    [setCartItems]
  );

  const removeCartItem = useCallback(
    (id: number) => {
      setCartItems((prev) => {
        if (!prev || prev.length === 0) return prev;

        const updatedCartItems = prev.filter((item) => item.id !== id);
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(updatedCartItems)
        );

        return updatedCartItems;
      });
    },
    [setCartItems]
  );

  const findCartItem = useCallback(
    (params: { id?: number; product?: CartProduct }) => {
      if (!cartItems) return undefined;

      return cartItems.find((item) => {
        if (params.id !== undefined) {
          return item.id === params.id;
        }

        if (params.product) {
          return (
            item.product.productID === params.product.productID &&
            item.product.colorID === params.product.colorID &&
            item.product.sizeID === params.product.sizeID
          );
        }

        return false;
      });
    },
    [cartItems]
  );

  const value = useMemo<CartContextProps>(
    () => ({
      cartItems,
      addCartItem,
      removeCartItem,
      findCartItem,
    }),
    [cartItems, addCartItem, removeCartItem, findCartItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

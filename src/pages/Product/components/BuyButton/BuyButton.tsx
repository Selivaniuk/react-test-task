import useCart from "components/CartProvider/useCart";
import styles from "./BuyButton.module.scss";

import useProductColor from "pages/Product/provider/useProductColor";
import useProductSize from "pages/Product/provider/useProductSize";
import { FC } from "react";

interface Props {
  productID: number;
}
const BuyButton: FC<Props> = ({ productID }) => {
  const { selectedSizeID } = useProductSize();
  const { selectedColorID } = useProductColor();
  const { findCartItem, addCartItem, removeCartItem } = useCart();

  if (selectedSizeID && selectedColorID && findCartItem) {
    const cartItem = findCartItem({
      product: { productID, colorID: selectedColorID, sizeID: selectedSizeID },
    });

    if (cartItem) {
      const handleRemove = () => {
        if (selectedSizeID && selectedColorID && removeCartItem) {
          removeCartItem(cartItem.id);
        }
      };

      return (
        <button
          disabled={!selectedSizeID || !selectedColorID}
          onClick={handleRemove}
          className={[styles.btn, styles.removeBtn].join(" ")}
        >
          Удалить из корзины
        </button>
      );
    }
  }

  const handleAdd = () => {
    if (selectedSizeID && selectedColorID && addCartItem) {
      addCartItem({
        productID,
        colorID: selectedColorID,
        sizeID: selectedSizeID,
      });
    }
  };

  return (
    <button
      disabled={!selectedSizeID || !selectedColorID}
      onClick={handleAdd}
      className={[styles.btn, styles.buyBtn].join(" ")}
    >
      Добавить в корзину
    </button>
  );
};

export default BuyButton;

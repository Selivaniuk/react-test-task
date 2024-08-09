import { CartProduct } from "components/CartProvider/CartContext";
import styles from "./CartItem.module.scss";
import { FC } from "react";
import useApi from "hooks/useApi";
import { getProduct, getProductColor, getSize } from "services/api";
import { Link } from "react-router-dom";

interface Props {
  item: CartProduct;
  onRemove: () => void;
}
const CartItem: FC<Props> = ({ item, onRemove }) => {
  const { data: product } = useApi(getProduct, [item.productID]);
  const { data: productColor } = useApi(getProductColor, [
    item.productID,
    item.colorID,
  ]);
  const { data: size } = useApi(getSize, [item.sizeID]);

  if (!product || !productColor || !size) {
    return null;
  }
  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          src={productColor.images[0]}
          alt={`${product.name} ${productColor.name}`}
        />
      </div>
      <Link
        className={styles.title}
        to={`/product/${product.id}?color=${productColor.id}&size=${size.id}`}
      >
        {product.name}
      </Link>
      <p>Цвет: {productColor.name}</p>
      <p>Размер: {size.label}</p>
      <p>Цена: {productColor.price}</p>
      <button className={styles.removeBtn} onClick={onRemove}>
        Удалить из корзины
      </button>
    </div>
  );
};

export default CartItem;

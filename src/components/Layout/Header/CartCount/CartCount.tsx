import useCart from "components/CartProvider/useCart";
import styles from "./CartCount.module.scss";

const CartCount: React.FC = () => {
  const { cartItems } = useCart();
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  return <span className={styles.container}>{cartItems.length}</span>;
};

export default CartCount;

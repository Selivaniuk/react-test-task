import styles from "./Cart.module.scss";
import useCart from "components/CartProvider/useCart";
import CartItem from "./CartItem/CartItem";

const Cart: React.FC = () => {
  const { cartItems, removeCartItem } = useCart();
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.products}>
        <p>В корзине нет товаров</p>
      </div>
    );
  }

  const handleRemoveItem = (cartItemID: number) => {
    removeCartItem?.(cartItemID);
  };

  return (
    <div className={styles.products}>
      {cartItems.map((cartItem) => (
        <CartItem
          item={cartItem.product}
          key={cartItem.id}
          onRemove={() => {
            handleRemoveItem(cartItem.id);
          }}
        />
      ))}
    </div>
  );
};

export default Cart;

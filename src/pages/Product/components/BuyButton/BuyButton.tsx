import styles from "./BuyButton.module.scss";

import useProductColor from "pages/Product/provider/useProductColor";
import useProductSize from "pages/Product/provider/useProductSize";

const BuyButton = () => {
  const { selectedSizeID } = useProductSize();
  const { selectedColorID } = useProductColor();

  const handleClick = () => {
    //TODO
  };

  return (
    <button
      disabled={!selectedSizeID || !selectedColorID}
      onClick={handleClick}
      className={styles.buyBtn}
    >
      Добавить в корзину
    </button>
  );
};

export default BuyButton;

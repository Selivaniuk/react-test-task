import { Product } from "types/product";
import styles from "./ColorInfo.module.scss";
import { FC } from "react";
import useProductColor from "pages/Product/provider/useProductColor";

interface Props {
  colors: Product["colors"];
}

const ColorInfo: FC<Props> = ({ colors }) => {
  const { selectedColorID } = useProductColor();
  const currentColor = colors.find((color) => color.id === selectedColorID);

  if (!currentColor) {
    return null;
  }

  return (
    <div className={styles.info}>
      <p>Цена: {currentColor.price}</p>
      <p>{currentColor.description}</p>
    </div>
  );
};

export default ColorInfo;

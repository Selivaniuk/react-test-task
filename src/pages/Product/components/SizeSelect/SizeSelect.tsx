import styles from "./SizeSelect.module.scss";
import { Product, Size } from "types/product";
import { FC, useEffect } from "react";
import useProductSize from "pages/Product/provider/useProductSize";
import useProductColor from "pages/Product/provider/useProductColor";

interface Props {
  sizes: Size[];
  colors: Product["colors"];
}

const SizeSelect: FC<Props> = ({ sizes, colors }) => {
  const { selectedSizeID, updateProductSize } = useProductSize();
  const { selectedColorID } = useProductColor();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedID = Number(event.target.value);
    if (isNaN(selectedID)) {
      return updateProductSize(undefined);
    }
    updateProductSize(selectedID);
  };

  const currentColor = colors.find((color) => color.id === selectedColorID);

  useEffect(() => {
    if (!currentColor || currentColor.sizes.length === 0) {
      updateProductSize(undefined);
    }
    if (!currentColor?.sizes.find((size) => size === selectedSizeID)) {
      updateProductSize(currentColor?.sizes[0]);
    }
  }, [currentColor, updateProductSize, selectedSizeID]);

  if (!currentColor) {
    return null;
  }

  if (currentColor.sizes.length === 0) {
    return <p>Для этого цвета нет доступных размеров</p>;
  }

  return (
    <div className={styles.container}>
      <p>Размер</p>
      <select value={selectedSizeID} onChange={handleChange}>
        {sizes.map((size) => (
          <option
            disabled={!currentColor.sizes.includes(size.id)}
            key={size.id}
            value={size.id}
          >
            {size.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SizeSelect;

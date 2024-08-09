import styles from "./ColorSelect.module.scss";
import { Product } from "types/product";
import { FC } from "react";
import useProductColor from "pages/Product/provider/useProductColor";

interface Props {
  colors: Product["colors"];
}
const ColorSelect: FC<Props> = ({ colors }) => {
  const { selectedColorID, updateProductColor } = useProductColor();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedID = Number(event.target.value);
    if (isNaN(selectedID)) {
      return updateProductColor(undefined);
    }
    updateProductColor(selectedID);
  };

  if (colors.length === 0) {
    return <p>У этого товара нет доступных цветов</p>;
  }

  return (
    <div className={styles.container}>
      <p>Цвет:</p>
      <select value={selectedColorID} onChange={handleChange}>
        {colors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorSelect;

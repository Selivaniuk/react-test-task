import styles from "./ProductCard.module.scss";
import useApi from "hooks/useApi";
import { Link } from "react-router-dom";
import { getSizes } from "services/api";
import { Product } from "types/product";

interface Props {
  product: Product;
}
const ProductCard: React.FC<Props> = ({ product }) => {
  const { data: sizes, error, isLoading } = useApi(getSizes, [product.id]);

  if (isLoading || error || !sizes || sizes.length === 0) {
    return null;
  }

  return (
    <>
      {product.colors.map((color) => {
        if (color.sizes.length === 0) return null;
        return (
          <div key={color.id} className={styles.card}>
            <div className={styles.imgWrap}>
              <img
                src={color.images[0]}
                alt={`${product.name} ${color.name}`}
              />
            </div>
            <Link
              className={styles.title}
              to={`/product/${product.id}?color=${color.id}`}
            >
              {product.name}
            </Link>
            <p>Цвет: {color.name}</p>
            <div className={styles.sizesWrap}>
              <p>Размер:</p>
              <div className={styles.sizes}>
                {color.sizes.map((size, i) => (
                  <p key={size}>{sizes.find((s) => s.id === size)?.label}</p>
                ))}
              </div>
            </div>
            <p>Цена: {color.price}</p>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;

import styles from "./Product.module.scss";
import Loader from "components/Loader/Loader";
import useApi from "hooks/useApi";
import ErrorPage from "pages/Error/Error";
import { useLocation, useParams } from "react-router-dom";
import { getProduct, getSizes } from "services/api";
import ProductProvider from "./provider/ProductProvider";
import SizeSelect from "./components/SizeSelect/SizeSelect";
import ColorInfo from "./components/ColorInfo/ColorInfo";
import ImageSlider from "./components/Gallery/Gallery";
import ColorSelect from "./components/ColorSelect/ColorSelect";
import BuyButton from "./components/BuyButton/BuyButton";

const Product = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const defaultColorId = new URLSearchParams(search).get("color");
  const { data: product, error, isLoading } = useApi(getProduct, Number(id));
  const {
    data: sizes,
    error: sizesError,
    isLoading: sizesIsLoading,
  } = useApi(getSizes);

  if (isLoading || sizesIsLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage message={error} />;
  }
  if (sizesError) {
    return <ErrorPage message={sizesError} />;
  }

  if (!product) {
    return <ErrorPage message="Failed to load product" />;
  }

  if (!sizes) {
    return <ErrorPage message="Failed to load sizes" />;
  }

  const firstColorId = product.colors[0].id;
  const currentColorId = defaultColorId ? Number(defaultColorId) : firstColorId;
  const firstSizeId = product.colors[currentColorId].sizes[0];

  return (
    <ProductProvider
      defaultColorId={currentColorId}
      defaultSizeId={firstSizeId}
    >
      <div className={styles.product}>
        <div className={styles.left}>
          <ImageSlider colors={product.colors} />
        </div>
        <div className={styles.right}>
          <p>{product.name}</p>
          <ColorSelect colors={product.colors} />
          <SizeSelect sizes={sizes} colors={product.colors} />
          <ColorInfo colors={product.colors} />
          <BuyButton />
        </div>
      </div>
    </ProductProvider>
  );
};

export default Product;

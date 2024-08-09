import styles from "./Product.module.scss";
import Loader from "components/Loader/Loader";
import useApi from "hooks/useApi";
import ErrorPage from "pages/Error/Error";
import { useLocation, useParams } from "react-router-dom";
import { getProduct, getProductColor, getSize, getSizes } from "services/api";
import ProductProvider from "./provider/ProductProvider";
import SizeSelect from "./components/SizeSelect/SizeSelect";
import ColorInfo from "./components/ColorInfo/ColorInfo";
import ImageSlider from "./components/Gallery/Gallery";
import ColorSelect from "./components/ColorSelect/ColorSelect";
import BuyButton from "./components/BuyButton/BuyButton";

const Product: React.FC = () => {
  const { id } = useParams();
  const productID = Number(id);
  const { search } = useLocation();
  const defaultColorId = new URLSearchParams(search).get("color");
  const defaultSizeId = new URLSearchParams(search).get("size");

  const { data: defaultColor } = useApi(
    getProductColor,
    [productID, Number(defaultColorId)],
    { skip: !productID || !defaultColorId }
  );

  const { data: defaultSize } = useApi(getSize, [Number(defaultSizeId)], {
    skip: !defaultSizeId,
  });

  const {
    data: product,
    error,
    isLoading,
  } = useApi(getProduct, [productID], { skip: !productID });
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

  const currentColorId = defaultColor ? defaultColor.id : product.colors[0].id;
  let currentSizeId = product.colors.find(
    (color) => color.id === defaultColor?.id
  )?.sizes[0];

  if (defaultSize) {
    const currentColor = product.colors.find(
      (color) => color.id === currentColorId
    );
    if (currentColor?.sizes.some((size) => size === defaultSize.id)) {
      currentSizeId = defaultSize.id;
    }
  }

  return (
    <ProductProvider
      defaultColorId={currentColorId}
      defaultSizeId={currentSizeId}
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
          <BuyButton productID={productID} />
        </div>
      </div>
    </ProductProvider>
  );
};

export default Product;

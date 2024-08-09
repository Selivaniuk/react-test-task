import styles from "./Products.module.scss";
import Loader from "components/Loader/Loader";
import useApi from "hooks/useApi";
import ErrorPage from "pages/Error/Error";
import ProductCard from "./components/ProductCard/ProductCard";
import { getProducts } from "services/api";

const Products: React.FC = () => {
  const { data: products, error, isLoading } = useApi(getProducts);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage message={error} />;
  }
  if (!products) {
    return <ErrorPage message="Failed to load product list" />;
  }

  return (
    <div className={styles.products}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;

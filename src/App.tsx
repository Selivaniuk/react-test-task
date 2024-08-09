import AppRouter from "components/AppRouter/AppRouter";
import CartProvider from "components/CartProvider/CartProvider";
import Layout from "components/Layout/Layout";

export default function App() {
  return (
    <CartProvider>
      <Layout>
        <AppRouter />
      </Layout>
    </CartProvider>
  );
}

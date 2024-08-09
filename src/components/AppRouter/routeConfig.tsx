import { RouteProps } from "react-router-dom";

import ProductsPage from "pages/Products/Products";
import ProductPage from "pages/Product/Product";
import CartPage from "pages/Cart/Cart";

enum AppRoutes {
  PRODUCTS = "products",
  PRODUCT = "product",
  CART = "cart",
}
interface routeProps {
  name: string;
  path: string;
  showHeader: boolean;
}
export const routes: Record<AppRoutes, routeProps> = {
  [AppRoutes.PRODUCTS]: {
    name: "Товары",
    path: "/",
    showHeader: true,
  },
  [AppRoutes.PRODUCT]: {
    name: "Товар",
    path: "/product/:id",
    showHeader: false,
  },
  [AppRoutes.CART]: {
    name: "Корзина",
    path: "/cart",
    showHeader: true,
  },
};

export const routeConfig: RouteProps[] = [
  {
    path: routes[AppRoutes.PRODUCTS].path,
    element: <ProductsPage />,
  },
  {
    path: routes[AppRoutes.PRODUCT].path,
    element: <ProductPage />,
  },
  {
    path: routes[AppRoutes.CART].path,
    element: <CartPage />,
  },
];

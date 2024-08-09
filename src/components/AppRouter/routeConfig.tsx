import { RouteProps } from "react-router-dom";

import ProductsPage from "pages/Products/Products";
import ProductPage from "pages/Product/Product";

enum AppRoutes {
  PRODUCTS = "products",
  PRODUCT = "product",
}
interface routeProps {
  name: string;
  path: string;
  showHeader: boolean;
}
export const routes: Record<AppRoutes, routeProps> = {
  [AppRoutes.PRODUCTS]: {
    name: "Products",
    path: "/",
    showHeader: true,
  },
  [AppRoutes.PRODUCT]: {
    name: "Product",
    path: "/product/:id",
    showHeader: false,
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
];

import { createContext } from "react";

export interface ProductColorContextProps {
  selectedColorID?: number;
  updateProductColor?: (colorID?: number) => void;
}
export interface ProductSizeContextProps {
  selectedSizeID?: number;
  updateProductSize?: (sizeID?: number) => void;
}

export const ProductColorContext = createContext<ProductColorContextProps>({});
export const ProductSizeContext = createContext<ProductSizeContextProps>({});

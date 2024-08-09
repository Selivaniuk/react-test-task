import { useContext } from "react";

import { ProductSizeContext } from "./ProductContext";

interface UseProductResult {
  selectedSizeID?: number;
  updateProductSize: (sizeID?: number) => void;
}

const useProductSize = (): UseProductResult => {
  const { selectedSizeID, updateProductSize } = useContext(ProductSizeContext);
  return {
    selectedSizeID,
    updateProductSize: updateProductSize || (() => {}),
  };
};

export default useProductSize;

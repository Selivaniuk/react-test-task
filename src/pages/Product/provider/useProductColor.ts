import { useContext } from "react";

import { ProductColorContext } from "./ProductContext";

interface UseProductColorResult {
  selectedColorID?: number;
  updateProductColor: (colorID?: number) => void;
}

const useProductColor = (): UseProductColorResult => {
  const { selectedColorID, updateProductColor } =
    useContext(ProductColorContext);
  return {
    selectedColorID,
    updateProductColor: updateProductColor || (() => {}),
  };
};

export default useProductColor;

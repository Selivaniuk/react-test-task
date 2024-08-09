import { useMemo, FC, PropsWithChildren, useState, useCallback } from "react";
import {
  ProductColorContext,
  ProductColorContextProps,
  ProductSizeContext,
  ProductSizeContextProps,
} from "./ProductContext";

interface Props {
  defaultColorId?: number;
  defaultSizeId?: number;
}

const ProductColorProvider: FC<
  PropsWithChildren<Pick<Props, "defaultColorId">>
> = ({ children, defaultColorId }) => {
  const [selectedColorID, setSelectedColorID] = useState<number | undefined>(
    defaultColorId
  );

  const updateProductColor = useCallback(
    (colorID?: number) => {
      setSelectedColorID(colorID);
    },
    [setSelectedColorID]
  );

  const value = useMemo<ProductColorContextProps>(
    () => ({
      selectedColorID,
      updateProductColor,
    }),
    [selectedColorID, updateProductColor]
  );

  return (
    <ProductColorContext.Provider value={value}>
      {children}
    </ProductColorContext.Provider>
  );
};

const ProductSizeProvider: FC<
  PropsWithChildren<Pick<Props, "defaultSizeId">>
> = ({ children, defaultSizeId }) => {
  const [selectedSizeID, setSelectedSizeID] = useState<number | undefined>(
    defaultSizeId
  );

  const updateProductSize = useCallback(
    (sizeID?: number) => {
      setSelectedSizeID(sizeID);
    },
    [setSelectedSizeID]
  );

  const value = useMemo<ProductSizeContextProps>(
    () => ({
      selectedSizeID,
      updateProductSize,
    }),
    [selectedSizeID, updateProductSize]
  );

  return (
    <ProductSizeContext.Provider value={value}>
      {children}
    </ProductSizeContext.Provider>
  );
};

const ProductProvider: FC<PropsWithChildren<Props>> = ({
  children,
  defaultColorId,
  defaultSizeId,
}) => {
  return (
    <ProductColorProvider defaultColorId={defaultColorId}>
      <ProductSizeProvider defaultSizeId={defaultSizeId}>
        {children}
      </ProductSizeProvider>
    </ProductColorProvider>
  );
};

export default ProductProvider;

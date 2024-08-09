import { LABELS } from "services/api";

export type Size = {
  id: number;
  label: (typeof LABELS)[number]["name"];
  number: number;
};

export type ProductColor = {
  id: number;
  name: string;
  images: string[];
  price: string;
  description: string;
  sizes: number[];
};

export type Product = {
  id: number;
  name: string;
  colors: ProductColor[];
};

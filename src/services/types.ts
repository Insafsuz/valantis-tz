export type ResGetIds = {
  result: string[];
};

export type Product = {
  brand: string | null;
  id: string;
  price: number;
  product: string;
};

export type ResGetItems = {
  result: Product[];
};

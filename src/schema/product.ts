export interface Product {
  category: string;
  content?: string;
  description: string;
  id: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
}
export interface GetProductsResponse {
  success: boolean;
  products: Product[];
}

export interface Products {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  images: string[];
  rating: number;
  discountPercentage?: number;
  brand?: string;
}

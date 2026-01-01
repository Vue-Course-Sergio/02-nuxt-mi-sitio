export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

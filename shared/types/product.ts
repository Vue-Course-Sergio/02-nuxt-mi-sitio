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

// Tipo para productos que vienen del servidor (fechas serializadas como strings)
export interface SerializedProduct
  extends Omit<Product, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

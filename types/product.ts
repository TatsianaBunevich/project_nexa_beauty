export interface Product {
  id: string;
  brand: string;
  product_name: string;
  category?: string;
  shade?: string;
  finish?: string;
  image_url?: string;
  confidence_score?: number;
  estimated_expiration?: Date;
  price?: number;
  currency?: string;
  embedding?: number[];
  description?: string;
}

export interface ProductSearchQuery {
  query?: string;
  category?: string;
  brand?: string;
  shade?: string;
  undertone?: string;
  priceMin?: number;
  priceMax?: number;
  limit?: number;
}

import { Product } from './product';

export interface MakeupLookStep {
  category: string;
  productId?: string;
  product?: Product;
  instruction: string;
}

export interface MakeupLook {
  name: string;
  occasion: string;
  steps: MakeupLookStep[];
  colorPalette: string[];
  reasoning: string;
  totalEstimatedCost?: number;
  currency?: string;
}

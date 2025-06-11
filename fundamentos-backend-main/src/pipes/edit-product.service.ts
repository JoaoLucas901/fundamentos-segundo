import { Injectable, NotFoundException } from "@nestjs/common";

interface Product {
  id: string;
  name: string;
  model: string;
  description: string;
  price: number;
  inStock: number;
  category: string;
  isAvailable: boolean;
  tags: string[];
  createdAt: string | Date | undefined;
  updatedAt: string | Date | undefined | null;
}

interface EditProductDto {
  name?: string;
  model?: string;
  description?: string;
  price?: number;
  inStock?: number;
  category?: string;
  isAvailable?: boolean;
  tags?: string[];
}

@Injectable()
export class EditProductService {
  constructor(private readonly productRepository: any) {}

  async execute(id: string, data: EditProductDto): Promise<{ product: Product }> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = await this.productRepository.update(id, data);

    return { product: updatedProduct };
  }
}
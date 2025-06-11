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

@Injectable()
export class UpdateAvailableProductService {
  constructor(private readonly productRepository: any) {}

  async execute(id: string, isAvailable: boolean): Promise<{ product: Product }> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = await this.productRepository.updateAvailable(id, isAvailable);

    return { product: updatedProduct };
  }
}
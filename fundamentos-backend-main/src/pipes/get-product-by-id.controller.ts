import { Controller, Get, Param, NotFoundException } from "@nestjs/common";

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

@Controller('/products')
export class GetProductByIdController {
  constructor(private readonly productRepository: any) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<{ product: Product }> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return { product };
  }
}
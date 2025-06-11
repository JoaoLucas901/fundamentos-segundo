import { Controller, Get, Query } from "@nestjs/common";

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
export class FetchRecentProductsController {
  constructor(private readonly productRepository: any) {}

  @Get('recent')
  async fetchRecent(
    @Query('limit') limit: string = '10'
  ): Promise<{ products: Product[] }> {
    const recentProducts = await this.productRepository.findRecent(Number(limit));
    return { products: recentProducts };
  }
}
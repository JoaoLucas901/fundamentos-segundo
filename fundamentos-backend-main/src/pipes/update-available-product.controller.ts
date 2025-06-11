import { Controller, Patch, Param, Body, NotFoundException, HttpCode } from "@nestjs/common";

interface UpdateAvailableDto {
  isAvailable: boolean;
}

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
export class UpdateAvailableProductController {
  constructor(private readonly productRepository: any) {}

  @Patch(':id/available')
  @HttpCode(200)
  async updateAvailable(
    @Param('id') id: string,
    @Body() body: UpdateAvailableDto
  ): Promise<{ product: Product }> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = await this.productRepository.updateAvailable(id, body.isAvailable);

    return { product: updatedProduct };
  }
}
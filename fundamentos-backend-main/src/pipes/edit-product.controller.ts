import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
// Define Category enum locally since it's not exported from @prisma/client
enum Category {
  ELECTRONICS = "ELECTRONICS",
  OTHER = "OTHER"
}
import { CreateProductService } from "./edit-product.service";

const editProductBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  inStock: z.number(),
  isAvailable: z.boolean(),
  category: z.enum([Category.ELECTRONICS, Category.OTHER]),
  tags: z.array(z.string()),
  id: z.string(), // Include id in the schema to identify which product to edit
});

const bodyValidationPipe = new ZodValidationPipe(editProductBodySchema);

type EditProductBodySchema = z.infer<typeof editProductBodySchema>;

@Controller('/products/:id')
export class EditProductController {
  constructor(private editProduct: CreateProductService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditProductBodySchema,
    @Param("id") id: string,
  ) {
    const {
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
    } = body;

    await this.editProduct.execute({
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      id, // Use the id from the route parameter
    });
  }
}
import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./product.respository";
interface Product {
    id: string,
    name: string,
    model: string,
    description: string,
    price: number,
    inStock: number,
    category: string;
    isAvailable: boolean,
    tags: string[];
    createdAt: string | Date | undefined;
    updatedAt: string | Date | undefined | null;
}

interface CreateProductServiceRequest{
    id: string,
    name: string,
      description: string,
      price: number,
      inStock: number,
      isAvailable: boolean,
      category: string,
      tags: string[],
}

type CreateProductServiceResponse = {
    product: Product;
    
}

@Injectable()
export class CreateProductService {
    productRepository: any;
    constructor (){}

        async execute({
            id,
            name,
            description,
            price,
            inStock,
            isAvailable,
            category,
            tags



        }:CreateProductServiceRequest):Promise<CreateProductServiceResponse>{
            const ProductWithSameName = await this.productRepository.findByName(name);

            if (ProductWithSameName) {
                throw new Error("Product")
            }

            const newProduct = await this.productRepository.create();

            return {
                product: {
                    id: newProduct.id?.toString() || "",
                    name,
                    description,
                    price,
                    inStock,
                    isAvailable,
                    category,
                    tags,
                    createdAt: newProduct.createdAt,
                    updatedAt: newProduct.updatedAt,
                    model: ""
                }
            }
    }
}
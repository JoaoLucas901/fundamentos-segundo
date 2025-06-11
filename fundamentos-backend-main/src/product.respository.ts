import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Prisma } from "@prisma/client";

export class ProductsRepository {
    constructor(private prisma: PrismaService) {}
    
    findById(id: string) {
        const product = this.prisma.product.findUnique({
            where: {
                id,
            }
        });
    }
}
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';
import { isValidCPF } from "./app.controller";

    const createProductBodySchema = z.object({
      name: z.string().min(3),
      model: z.string().min(3),
      dateManufacture: z.string().date(), 
      year: z.number(),
      brand: z.string(),
      email: z.string().email(),
      cpf: z.string().regex(/^\d{11}$/ , {message:'Cpf deve conter exatamente 11 digitos Numericos'})
      .refine(isValidCPF,{message:"CPF Invalid"})
    
    });

    const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);
    type createProductBodySchema = z.infer<typeof createProductBodySchema>;


    @Controller('/products')
    export class CreateProductController {
        constructor(){}


        @Post()
        @HttpCode(201)
        async handle(@Body(bodyValidationPipe) body: createProductBodySchema){
    
        }



    }   
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
// Simple CPF validation function (replace with your actual logic if needed)
function isValidCPF(cpf: string): boolean {
  // Add your CPF validation logic here
  // Example: checks for 11 repeated digits (invalid CPF)
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  // Add more validation as needed
  return true;
}

const createModelBodySchema = z.object({
  name: z.string().min(3),
  model: z.string().min(3),
  dateManufacture: z.string().date(),
  year: z.number(),
  brand: z.string(),
  email: z.string().email(),
  cpf: z.string().regex(/^\d{11}$/, { message: '' })
    .refine(isValidCPF, { message: "" })
});

const bodyValidationPipe = new ZodValidationPipe(createModelBodySchema);
type CreateModelBody = z.infer<typeof createModelBodySchema>;

@Controller('/models')
export class CreateModelController {
  constructor() {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateModelBody) {
    // Implement your logic here, e.g., call a service to create the model
    // return created model or appropriate response
    return { message: "Model created successfully", data: body };
  }
}
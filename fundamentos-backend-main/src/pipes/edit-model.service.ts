import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "./zod-validation-pipe";
// Removed circular import of EditModelService

const editModelBodySchema = z.object({
  name: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editModelBodySchema);

type EditModelBodySchema = z.infer<typeof editModelBodySchema>;

@Controller('/models/:id')
export class EditModelService {
  async execute({ name, id }: { name: string; id: string }) {
    // Implement your logic here
  }
}

@Controller('/models/:id')
export class EditModelController {
  constructor(private editModel: EditModelService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditModelBodySchema,
    @Param("id") id: string,
  ) {
    const {
      name,
    } = body;

    await this.editModel.execute({
      name,
      id,
    });
  }
}
import { Injectable, ConflictException } from "@nestjs/common";

interface Model {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
}

interface CreateModelServiceRequest {
    name: string;
}

type CreateModelServiceResponse = {
    model: Model;
};

@Injectable()
export class CreateModelService {
    constructor(private readonly modelRepository: any) {}

    async execute({
        name,
    }: CreateModelServiceRequest): Promise<CreateModelServiceResponse> {
        const modelWithSameName = await this.modelRepository.findByName(name);

        if (modelWithSameName) {
            throw new ConflictException("Model with this name already exists");
        }

        const newModel = await this.modelRepository.create({ name });

        return {
            model: {
                id: newModel.id?.toString() || "",
                name: newModel.name,
                createdAt: newModel.createdAt,
                updatedAt: newModel.updatedAt,
            },
        };
    }
}
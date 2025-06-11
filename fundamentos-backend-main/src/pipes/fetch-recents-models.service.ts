import { Injectable } from "@nestjs/common";

interface Model {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
}

@Injectable()
export class FetchRecentsModelsService {
  constructor(private readonly modelRepository: any) {}

  async execute(limit: number = 10): Promise<{ models: Model[] }> {
    const recentModels = await this.modelRepository.findRecent(limit);
    return { models: recentModels };
  }
}
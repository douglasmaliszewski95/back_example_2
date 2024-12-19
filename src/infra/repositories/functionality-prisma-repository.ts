/* eslint-disable @typescript-eslint/no-unused-vars */
import { Functionality } from '@domain/entities/Functionality';
import { FunctionalityRepository } from '../../domain/repositories/functionality-repository';
import { PrismaClient } from '@prisma/client';
import { FunctionalityModelMapper } from '../../domain/dto/functionality/functionality-model-mapper';
import { CreateFunctionalityDTO } from '@domain/dto/functionality/create-functionality-dto';
import { UpdateFunctionalityDTO } from '@domain/dto/functionality/update-functionality-dto';

export class FunctionalityPrismaRepository implements FunctionalityRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Functionality[]> {
    try {
      const models = await this.prisma.functionalities.findMany();
      return models.map((model) => FunctionalityModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<Functionality | null> {
    try {
      const model = await this.prisma.functionalities.findUnique({
        where: {
          functionalityId: id,
        },
      });

      if (model) return FunctionalityModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async insert(entity: CreateFunctionalityDTO): Promise<Functionality> {
    try {
      const createdFunctionality = await this.prisma.functionalities.create({
        data: {
          name: entity.name,
          system: entity.system,
        },
      });

      return createdFunctionality;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async update(entity: UpdateFunctionalityDTO): Promise<Functionality> {
    try {
      const savedFunctionality = await this.prisma.functionalities.update({
        where: {
          functionalityId: entity.functionalityId,
        },
        data: {
          name: entity.name,
          system: entity.system,
          updatedAt: new Date(),
        },
      });

      return savedFunctionality;
    } finally {
      await this.prisma.$disconnect;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.functionalities.update({
        where: {
          functionalityId: id,
        },
        data: {
          // excluded: true,
          updatedAt: new Date(),
        },
      });
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

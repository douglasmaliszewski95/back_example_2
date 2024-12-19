/* eslint-disable @typescript-eslint/no-unused-vars */
import { Area } from '@domain/entities/Area';
import { AreaRepository } from '../../domain/repositories/area-repository';
import { PrismaClient } from '@prisma/client';
import { AreaModelMapper } from '../../domain/dto/area/area-model-mapper';
import { CreateAreaDTO } from '@domain/dto/area/create-area-dto';
import { UpdateAreaDTO } from '@domain/dto/area/update-area-dto';

export class AreaPrismaRepository implements AreaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Area[]> {
    try {
      const models = await this.prisma.areas.findMany();
      return models.map((model) => AreaModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<Area | null> {
    try {
      const model = await this.prisma.areas.findUnique({
        where: {
          areaId: id,
        },
      });

      if (model) return AreaModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async insert(entity: CreateAreaDTO): Promise<Area> {
    try {
      const createdArea = await this.prisma.areas.create({
        data: {
          name: entity.name,
          regionOperationId: entity.regionOperationId,
        },
      });

      return createdArea;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async update(entity: UpdateAreaDTO): Promise<Area> {
    try {
      const savedArea = await this.prisma.areas.update({
        where: {
          areaId: entity.areaId,
        },
        data: {
          name: entity.name,
          regionOperationId: entity.regionOperationId,
          updatedAt: new Date(),
        },
      });

      return savedArea;
    } finally {
      await this.prisma.$disconnect;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.areas.update({
        where: {
          areaId: id,
        },
        data: {
          excluded: true,
          updatedAt: new Date(),
        },
      });
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

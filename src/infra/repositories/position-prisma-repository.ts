/* eslint-disable @typescript-eslint/no-unused-vars */
import { Position } from '@domain/entities/Position';
import { PositionRepository } from '../../domain/repositories/position-repository';
import { PrismaClient } from '@prisma/client';
import { PositionModelMapper } from '../../domain/dto/position/position-model-mapper';
import { CreatePositionDTO } from '@domain/dto/position/create-position-dto';
import { UpdatePositionDTO } from '@domain/dto/position/update-position-dto';

export class PositionPrismaRepository implements PositionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Position[]> {
    try {
      const models = await this.prisma.positions.findMany();
      return models.map((model) => PositionModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<Position | null> {
    try {
      const model = await this.prisma.positions.findUnique({
        where: {
          positionId: id,
        },
      });

      if (model) return PositionModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async insert(entity: CreatePositionDTO): Promise<Position> {
    try {
      const createdPosition = await this.prisma.positions.create({
        data: {
          name: entity.name,
          regionOperationId: entity.regionOperationId,
        },
      });

      return createdPosition;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async update(entity: UpdatePositionDTO): Promise<Position> {
    try {
      const savedPosition = await this.prisma.positions.update({
        where: {
          positionId: entity.positionId,
        },
        data: {
          name: entity.name,
          regionOperationId: entity.regionOperationId,
        },
      });

      return savedPosition;
    } finally {
      await this.prisma.$disconnect;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.positions.update({
        where: {
          positionId: id,
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

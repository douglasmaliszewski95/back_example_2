/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegionOperation } from '@domain/entities/RegionOperation';
import { RegionOperationRepository } from '@domain/repositories/region-operation-repository';
import { PrismaClient } from '@prisma/client';

export class RegionOperationPrismaRepository implements RegionOperationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<RegionOperation[]> {
    try {
      const models = await this.prisma.regionOperation.findMany();

      return models;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

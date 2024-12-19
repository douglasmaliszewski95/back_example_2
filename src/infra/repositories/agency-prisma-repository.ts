import { Agency } from '@domain/entities/Agency';
import { AgencyRepository } from '@domain/repositories/agency-repository';
import { PrismaClient } from '@prisma/client';

export class AgencyPrismaRepository implements AgencyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Agency[]> {
    try {
      const models = await this.prisma.agencies.findMany();

      return models;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

import { Validations } from '@domain/entities/Validations';

import { ValidationsRepository } from '../../domain/repositories/validations-repository';
import { PrismaClient } from '@prisma/client';
import { ValidationsModelMapper } from '../../domain/dto/validations/list-validations-dto';

export class ValidationsPrismaRepository implements ValidationsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Validations[]> {
    try {
      const models = await this.prisma.validations.findMany();
      return models.map((model) => ValidationsModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

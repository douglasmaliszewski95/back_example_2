/* eslint-disable @typescript-eslint/no-unused-vars */
import { Log } from '@domain/entities/Log';
import { LogRepository } from '../../domain/repositories/log-repository';
import { PrismaClient } from '@prisma/client';
import { LogModelMapper } from '../../domain/dto/log/log-model-mapper';

export class LogPrismaRepository implements LogRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async insert(entity: Log): Promise<Log | null> {
    try {
      const createdLog = await this.prisma.logs.create({
        data: {
          systemActionId: entity.systemActionId,
          userId: entity.userId,
          date: new Date(),
          message: entity.message,
        },
      });

      return createdLog;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findAll(): Promise<Log[]> {
    try {
      const models = await this.prisma.logs.findMany({
        include: {
          systemActions: true,
        },
      });
      return models.map((model) => LogModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { SystemAction } from '@domain/entities/SystemAction';
import { SystemActionRepository } from '../../domain/repositories/systemAction-repository';
import { PrismaClient } from '@prisma/client';
import { SystemActionModelMapper } from '../../domain/dto/systemAction/systemAction-model-mapper';

export class SystemActionPrismaRepository implements SystemActionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async insert(entity: SystemAction): Promise<SystemAction> {
    try {
      const createdSystemAction = await this.prisma.systemActions.create({
        data: {
          systemActionId: entity.systemActionId,
          name: entity.name,
          excluded: entity.excluded,
          createdAt: new Date(),
        },
      });

      return createdSystemAction;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<SystemAction | null> {
    try {
      const model = await this.prisma.systemActions.findUnique({
        where: {
          systemActionId: id,
        },
      });

      if (model) return SystemActionModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findAll(): Promise<SystemAction[]> {
    try {
      const models = await this.prisma.systemActions.findMany();
      return models.map((model) => SystemActionModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findByName(name: string): Promise<SystemAction | null> {
    try {
      const model = await this.prisma.systemActions.findFirst({
        where: {
          name: {
            contains: name,
          },
        },
      });
      if (model) return SystemActionModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async update(systemAction: SystemAction): Promise<SystemAction> {
    try {
      const systemActionData = {
        name: systemAction.name,
        updatedAt: new Date(),
      };

      const updatedSystemActionModel = await this.prisma.systemActions.update({
        where: {
          systemActionId: systemAction.systemActionId,
        },
        data: {
          ...systemActionData,
        },
      });

      if (updatedSystemActionModel) return SystemActionModelMapper.toEntity(updatedSystemActionModel);

      return updatedSystemActionModel;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.systemActions.update({
        where: {
          systemActionId: id,
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

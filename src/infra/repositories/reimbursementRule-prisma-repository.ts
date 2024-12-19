/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReimbursementRule } from '@domain/entities/ReimbursementRule';
import { ReimbursementRuleRepository } from '../../domain/repositories/reimbursementRule-repository';
import { PrismaClient } from '@prisma/client';
import { ReimbursementRuleModelMapper } from '../../domain/dto/reimbursement/reimbursementRules-model-mapper';
import { CreateReimbursementRuleDTO } from '@domain/dto/reimbursement/create-reimbursementRules-dto';
import { UpdateReimbursementRuleDTO } from '@domain/dto/reimbursement/update-reimbursementRules-dto';

export class ReimbursementRulePrismaRepository implements ReimbursementRuleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<ReimbursementRule[]> {
    try {
      const models = await this.prisma.reimbursementRules.findMany();
      return models.map((model) => ReimbursementRuleModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(reimbursementRuleId: string): Promise<ReimbursementRule | null> {
    try {
      const model = await this.prisma.reimbursementRules.findUnique({
        where: {
          reimbursementRulesId: reimbursementRuleId,
        },
        include: {
          reimbursementRulesAreas: {
            include: {
              areas: true,
            },
          },
          //reimbursementRulesAreas: true,
          reimbursementRulesHistoric: true,
          reimbursementRulesItens: true,
          // reimbursementRulesPositions: true,
          reimbursementRulesPositions: {
            include: {
              positions: true,
            },
          },
        },
      });

      if (model) return ReimbursementRuleModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findRulesByUser(): Promise<ReimbursementRule[]> {
    try {
      const models = await this.prisma.reimbursementRules.findMany({
        include: {
          reimbursementRulesAreas: true,
          reimbursementRulesPositions: true,
          reimbursementRulesHistoric: true,
          reimbursementRulesItens: true,
        },
        // where: {
        //   AND: [
        //     {
        //       reimbursementRulesAreas: {
        //         every: {
        //           areaId: userData.userAreas?.[0].areaId,
        //         },
        //       },
        //     },
        //     {
        //       reimbursementRulesPositions: {
        //         every: {
        //           positionId: userData.userPositions?.[0].positionId,
        //         },
        //       },
        //     },
        //   ],
        // },
      });
      return models.map((model) => ReimbursementRuleModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async insert(dto: CreateReimbursementRuleDTO): Promise<ReimbursementRule> {
    const ruleData = {
      valueLimit: dto.valueLimit,
      beginDate: dto.beginDate,
      rules: dto.rules,
      name: dto.name,
      regionOperationId: dto.regionOperationId,
      languageId: dto.languageId,
      icon: dto.icon,
    };

    const reimbursementRuleAreaData = dto.reimbursementRuleAreas.map((ruleArea) => ({
      areaId: ruleArea,
    }));

    const reimbursementRulePositionData = dto.reimbursementRulePositions.map((rulePosition) => ({
      positionId: rulePosition,
    }));

    const reimbursementRuleItemData = dto.reimbursementRuleItens.map((ruleItem) => ({
      name: ruleItem,
    }));

    const savedRuleModel = await this.prisma.reimbursementRules.create({
      data: {
        ...ruleData,
        reimbursementRulesAreas: {
          create: reimbursementRuleAreaData,
        },
        reimbursementRulesPositions: {
          create: reimbursementRulePositionData,
        },
        reimbursementRulesItens: {
          create: reimbursementRuleItemData,
        },
      },
      include: { reimbursementRulesAreas: true, reimbursementRulesPositions: true, reimbursementRulesItens: true },
    });

    if (savedRuleModel) return ReimbursementRuleModelMapper.toEntity(savedRuleModel);

    return savedRuleModel;
  }

  async update(dto: UpdateReimbursementRuleDTO): Promise<ReimbursementRule> {
    try {
      const ruleData = {
        valueLimit: dto.valueLimit,
        beginDate: dto.beginDate,
        rules: dto.rules,
        name: dto.name,
        regionOperationId: dto.regionOperationId,
        languageId: dto.languageId,
        icon: dto.icon,
      };

      const reimbursementRuleAreaData = dto.reimbursementRuleAreas
        ? dto.reimbursementRuleAreas.map((ruleArea) => ({
            areaId: ruleArea,
          }))
        : [];

      const reimbursementRulePositionsData = dto.reimbursementRulePositions
        ? dto.reimbursementRulePositions.map((rulePosition) => ({
            positionId: rulePosition,
          }))
        : [];

      const reimbursementRuleItensData = dto.reimbursementRuleItens
        ? dto.reimbursementRuleItens.map((ruleItem) => ({
            name: ruleItem,
          }))
        : [];

      const reimbursementRuleHistoricData = {
        //reimbursementRulesId: dto.reimbursementRuleId,
        newValue: dto.reimbursementRuleHistoric.newValue as string,
        name: dto.name as string,
        createdAt: dto.reimbursementRuleHistoric.createdAt,
      };

      const savedRuleModel = await this.prisma.reimbursementRules.update({
        where: {
          reimbursementRulesId: dto.reimbursementRuleId,
        },
        data: {
          ...ruleData,
          reimbursementRulesAreas: reimbursementRuleAreaData.length
            ? {
                deleteMany: {
                  reimbursementRulesId: dto.reimbursementRuleId,
                },
                create: reimbursementRuleAreaData,
              }
            : undefined,
          reimbursementRulesPositions: reimbursementRulePositionsData.length
            ? {
                deleteMany: {
                  reimbursementRulesId: dto.reimbursementRuleId,
                },
                create: reimbursementRulePositionsData,
              }
            : undefined,
          reimbursementRulesItens: reimbursementRuleItensData.length
            ? {
                deleteMany: {
                  reimbursementRulesId: dto.reimbursementRuleId,
                },
                create: reimbursementRuleItensData,
              }
            : undefined,
          reimbursementRulesHistoric: {
            create: reimbursementRuleHistoricData,
          },
        },
        include: {
          reimbursementRulesAreas: true,
          reimbursementRulesPositions: true,
          reimbursementRulesItens: true,
          reimbursementRulesHistoric: true,
        },
      });

      if (savedRuleModel) return ReimbursementRuleModelMapper.toEntity(savedRuleModel);

      return savedRuleModel;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async enableDisable(id: string, active: boolean): Promise<void> {
    try {
      await this.prisma.reimbursementRules.update({
        where: {
          reimbursementRulesId: id,
        },
        data: {
          excluded: active,
          updatedAt: new Date(),
        },
      });
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

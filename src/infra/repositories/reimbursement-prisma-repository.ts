/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reimbursement } from '@domain/entities/Reimbursement';
import { ReimbursementRepository } from '../../domain/repositories/reimbursement-repository';
import { PrismaClient } from '@prisma/client';
import { ReimbursementModelMapper } from '../../domain/dto/reimbursement/reimbursement-model-mapper';
import { ListReimbursementByUserDto, ListReimbursementDto } from '@domain/dto/reimbursement/list-reimbursement-dto';
import { CreateReimbursementDTO } from '@domain/dto/reimbursement/create-reimbursement-dto';
import { formatISO } from 'date-fns';
import { ReimbursementStatus } from '@domain/enum/ReimbursementStatus';
import { ApproveReimbursementDto } from '@domain/dto/reimbursement/approve-reimbursement-dto';

export class ReimbursementPrismaRepository implements ReimbursementRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(listReimbursementDto: ListReimbursementDto): Promise<Reimbursement[]> {
    // new Date(listReimbursementDto.startDate).setHours(0,
    try {
      const models = await this.prisma.reimbursement.findMany({
        include: {
          reimbursementRules: true,
          reimbursementEvidence: true,
          users: true,
          reimbursementsValidation: {
            include: {
              validations: true,
            },
          },
        },
        where: {
          dateRequest: {
            gte: listReimbursementDto.startDate ? new Date(`${listReimbursementDto.startDate} 00:00`) : undefined,
            lte: listReimbursementDto.endDate ? new Date(`${listReimbursementDto.endDate} 23:59`) : undefined,
          },
          status: listReimbursementDto.status ? listReimbursementDto.status : undefined,
        },
        orderBy: {
          dateRequest: listReimbursementDto.sortDir === 'asc' ? 'asc' : 'desc',
        },
      });
      return models.map((model) => ReimbursementModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findByUser(listReimbursementByUserDto: ListReimbursementByUserDto): Promise<Reimbursement[]> {
    try {
      const models = await this.prisma.reimbursement.findMany({
        include: {
          reimbursementRules: true,
          reimbursementEvidence: true,
          reimbursementsValidation: {
            include: {
              validations: true,
            },
          },
          users: true,
        },
        where: {
          dateRequest: {
            gte: listReimbursementByUserDto.startDate
              ? new Date(`${listReimbursementByUserDto.startDate} 00:00`)
              : undefined,
            lte: listReimbursementByUserDto.endDate
              ? new Date(`${listReimbursementByUserDto.endDate} 23:59`)
              : undefined,
          },
          status: listReimbursementByUserDto.status ? listReimbursementByUserDto.status : undefined,
          AND: {
            userId: listReimbursementByUserDto.userId,
          },
        },
        orderBy: {
          dateRequest: listReimbursementByUserDto.sortDir === 'asc' ? 'asc' : 'desc',
        },
      });
      return models.map((model) => ReimbursementModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(reimbursementId: string): Promise<Reimbursement | null> {
    try {
      const model = await this.prisma.reimbursement.findFirst({
        where: {
          reimbursementId: reimbursementId,
        },
      });

      if (model) return ReimbursementModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async show(reimbursementId: string): Promise<Reimbursement | null> {
    try {
      const model = await this.prisma.reimbursement.findFirst({
        where: {
          reimbursementId,
        },
        include: {
          users: true,
          reimbursementRules: true,
          reimbursementEvidence: true,
          reimbursementsOCRLog: true,
          reimbursementStatus: {
            orderBy: {
              createdAt: 'desc',
            },
          },
          reimbursementsValidation: {
            include: {
              validations: true,
            },
          },
        },
      });

      if (model) return ReimbursementModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async insert(dto: CreateReimbursementDTO): Promise<Reimbursement> {
    try {
      const status = dto.status === 'CONFORMING' ? '2' : '3';

      const remimbursementData = {
        reimbursementId: dto.reimbursementId,
        userId: dto.userId,
        reimbursementRulesId: dto.reimbursementRulesId,
        status,
        dateRequest: formatISO(dto.dateRequest),
        note: dto.note,
        dateExpense: formatISO(dto.dateExpense),
        valueInvoice: dto.valueInvoice,
        valueReimbursement: dto.valueReimbursement,
      };

      const statusData = {
        status,
      };

      const reimbursementValidationData = dto.reimbursementsValidation.map((reimbursementValidation) => ({
        validationsId: reimbursementValidation,
      }));

      const reimbursementOcrLogData = dto.reimbursementsOCRLog.map((ocrLog) => ({
        OCRDate: formatISO(ocrLog.ocrDate),
        OCRValue: ocrLog.ocrValue,
        OCRItens: ocrLog.ocrItem,
      }));

      const savedUserModel = await this.prisma.reimbursement.create({
        data: {
          ...remimbursementData,
          reimbursementStatus: {
            create: statusData,
          },
          reimbursementsValidation: {
            create: reimbursementValidationData,
          },
          reimbursementsOCRLog: {
            create: reimbursementOcrLogData,
          },
        },
        include: {
          users: true,
          reimbursementStatus: {
            orderBy: {
              createdAt: 'desc',
            },
          },
          reimbursementsValidation: true,
          reimbursementsOCRLog: true,
        },
      });

      if (savedUserModel) return ReimbursementModelMapper.toEntity(savedUserModel);

      return savedUserModel;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async approve(approveReimbursementDto: ApproveReimbursementDto): Promise<Reimbursement | null> {
    try {
      const savedReimbursement = await this.prisma.reimbursement.update({
        where: {
          reimbursementId: approveReimbursementDto.reimbursementId,
        },
        data: {
          status: ReimbursementStatus.APPROVED,
          reimbursementStatus: {
            create: {
              status: ReimbursementStatus.APPROVED,
              commentary: approveReimbursementDto.commentary,
            },
          },
        },
        include: {
          reimbursementStatus: {
            orderBy: {
              createdAt: 'desc',
            },
          },
          reimbursementsValidation: true,
          reimbursementsOCRLog: true,
          users: true,
        },
      });

      if (savedReimbursement) return ReimbursementModelMapper.toEntity(savedReimbursement);

      return savedReimbursement;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async addEvidence(reimbursementId: string, s3urls: { url: string; type: string }[]): Promise<void> {
    try {
      const evidences = s3urls.map((item) => ({ document: item.url, type: Number(item.type), reimbursementId }));
      await this.prisma.reimbursementEvidence.createMany({ data: evidences });
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

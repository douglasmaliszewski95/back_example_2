import { PaginatedData, paginator } from '@application/utils/pagination';
import { AbstractReimbursementService } from './abstract-reimbursement.service';
import { Reimbursement } from '@domain/entities/Reimbursement';
import { ReimbursementRepository } from '@domain/repositories/reimbursement-repository';
import { ListReimbursementByUserDto, ListReimbursementDto } from '@domain/dto/reimbursement/list-reimbursement-dto';
import { SortDir } from '@application/types/SortDir';
import { PaginationDto } from '@domain/dto/shared/paginationDto';
import AppError from '@domain/exceptions/AppError';
import { NOT_FOUND } from 'http-status';
import { CreateReimbursementDTO } from '@domain/dto/reimbursement/create-reimbursement-dto';
import { ApproveReimbursementDto } from '@domain/dto/reimbursement/approve-reimbursement-dto';
import { ReimbursementStatus } from '@domain/enum/ReimbursementStatus';
import { S3Uploader } from '@application/utils/aws-s3-upload';
import { awsS3Config } from '@config/aws-config';
import { File } from '@domain/dto/shared/File';

export class ReimbursementService implements AbstractReimbursementService {
  constructor(private reimbursementRepository: ReimbursementRepository) {}

  async list(
    page: number,
    pageSize: number,
    startDate: string,
    endDate: string,
    sortDir: SortDir,
    status: string,
  ): Promise<PaginatedData<Reimbursement>> {
    const listReimbursementDto = new ListReimbursementDto(startDate, endDate, status, sortDir);

    const reimbursement = await this.reimbursementRepository.findAll(listReimbursementDto);

    const paginatedReimbursement = paginator(reimbursement, page, pageSize);

    return paginatedReimbursement;
  }

  async listByUser(
    { startDate, endDate, sortDir, status, userId }: ListReimbursementByUserDto,
    { page, pageSize }: PaginationDto,
  ): Promise<PaginatedData<Reimbursement>> {
    const listReimbursementByUserDto = new ListReimbursementByUserDto(userId, startDate, endDate, status, sortDir);

    const reimbursement = await this.reimbursementRepository.findByUser(listReimbursementByUserDto);

    const paginatedReimbursement = paginator(reimbursement, page, pageSize);

    return paginatedReimbursement;
  }

  async show(reimbursementId: string): Promise<Reimbursement | null> {
    const reimbursement = await this.reimbursementRepository.show(reimbursementId);

    if (!reimbursement) {
      throw new AppError('Reimbursement not found', NOT_FOUND);
    }

    return reimbursement;
  }

  async createReimbursement(createReimbursementDto: CreateReimbursementDTO): Promise<Reimbursement> {
    if (createReimbursementDto.valueReimbursement > createReimbursementDto.valueInvoice) {
      throw new AppError('The refund amount cannot be greater than the invoice amount', NOT_FOUND);
    }

    const reimbursementDto = new CreateReimbursementDTO({
      userId: createReimbursementDto.userId,
      reimbursementRulesId: createReimbursementDto.reimbursementRulesId,
      dateRequest: createReimbursementDto.dateRequest,
      note: createReimbursementDto.note,
      status: createReimbursementDto.status,
      dateExpense: createReimbursementDto.dateExpense,
      valueInvoice: createReimbursementDto.valueInvoice,
      valueReimbursement: createReimbursementDto.valueReimbursement,
      reimbursementsOCRLog: createReimbursementDto.reimbursementsOCRLog,
      reimbursementsValidation: createReimbursementDto.reimbursementsValidation,
    });

    const reimbursement = await this.reimbursementRepository.insert(reimbursementDto);

    return reimbursement;
  }

  async approve(approveReimbursementDto: ApproveReimbursementDto): Promise<Reimbursement | null> {
    const reimbursementExist = await this.reimbursementRepository.findById(approveReimbursementDto.reimbursementId);

    if (!reimbursementExist) {
      throw new AppError('Reimbursement not found', NOT_FOUND);
    }

    if (reimbursementExist.status === ReimbursementStatus.APPROVED) {
      throw new AppError('Reimbursement already approved');
    }

    const reimbursement = await this.reimbursementRepository.approve(approveReimbursementDto);

    return reimbursement;
  }

  async addEvidences(reimbursementId: string, files: File[]): Promise<Reimbursement | null> {
    const reimbursementExist = await this.reimbursementRepository.findById(reimbursementId);

    if (!reimbursementExist) {
      throw new AppError('Reimbursement not found', NOT_FOUND);
    }

    const s3Uploader = new S3Uploader(awsS3Config);

    const uploadPromises = files.map(async (file) => {
      const [type, name] = file.fileName.split('_');

      const s3result = await s3Uploader.uploadFile(file.file, name, process.env.AWS_S3_BUCKET_NAME as string);

      return {
        url: s3result.Location,
        type,
      };
    });

    const s3result = await Promise.all(uploadPromises);

    await this.reimbursementRepository.addEvidence(reimbursementId, s3result);

    const reimbursementData = await this.reimbursementRepository.show(reimbursementId);

    return reimbursementData;
  }
}

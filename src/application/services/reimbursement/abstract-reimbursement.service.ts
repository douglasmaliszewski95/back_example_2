import { SortDir } from '@application/types/SortDir';
import { PaginatedData } from '@application/utils/pagination';
import { ApproveReimbursementDto } from '@domain/dto/reimbursement/approve-reimbursement-dto';
import { CreateReimbursementDTO } from '@domain/dto/reimbursement/create-reimbursement-dto';
import { ListReimbursementByUserDto } from '@domain/dto/reimbursement/list-reimbursement-dto';
import { File } from '@domain/dto/shared/File';
import { PaginationDto } from '@domain/dto/shared/paginationDto';
import { Reimbursement } from '@domain/entities/Reimbursement';

export abstract class AbstractReimbursementService {
  abstract list(
    page: number,
    pageSize: number,
    startDate: string,
    endDate: string,
    sortDir: SortDir,
    status: string,
  ): Promise<PaginatedData<Reimbursement>>;
  abstract listByUser(
    { startDate, endDate, sortDir, status, userId }: ListReimbursementByUserDto,
    { page, pageSize }: PaginationDto,
  ): Promise<PaginatedData<Reimbursement>>;
  abstract show(reimbursementId: string): Promise<Reimbursement | null>;
  abstract approve(approveReimbursementDto: ApproveReimbursementDto): Promise<Reimbursement | null>;
  abstract createReimbursement(createReimbursementDto: CreateReimbursementDTO): Promise<Reimbursement>;
  abstract addEvidences(reimbursementId: string, files: File[]): Promise<Reimbursement | null>;
}

import { ApproveReimbursementDto } from '@domain/dto/reimbursement/approve-reimbursement-dto';
import { CreateReimbursementDTO } from '@domain/dto/reimbursement/create-reimbursement-dto';
import { ListReimbursementByUserDto, ListReimbursementDto } from '@domain/dto/reimbursement/list-reimbursement-dto';
import { Reimbursement } from '@domain/entities/Reimbursement';

export interface ReimbursementRepository {
  findAll(listReimbursementDto: ListReimbursementDto): Promise<Reimbursement[]>;

  findById(reimbursementId: string): Promise<Reimbursement | null>;

  findByUser(listReimbursementByUserDto: ListReimbursementByUserDto): Promise<Reimbursement[]>;

  show(reimbursementId: string): Promise<Reimbursement | null>;

  insert(dto: CreateReimbursementDTO): Promise<Reimbursement>;

  approve(approveReimbursementDto: ApproveReimbursementDto): Promise<Reimbursement | null>;

  addEvidence(reimbursementId: string, s3urls: { url: string; type: string }[]): Promise<void>;
}

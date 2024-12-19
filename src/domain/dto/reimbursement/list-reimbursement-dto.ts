import { SortDir } from '@application/types/SortDir';

export class ListReimbursementDto {
  constructor(
    public readonly startDate?: string,
    public readonly endDate?: string,
    public readonly status?: string,
    public readonly sortDir?: SortDir,
  ) {}
}

export class ListReimbursementByUserDto extends ListReimbursementDto {
  constructor(userId: string, startDate?: string, endDate?: string, status?: string, sortDir?: SortDir) {
    super(startDate, endDate, status, sortDir);
    this.userId = userId;
  }

  public readonly userId: string;
}

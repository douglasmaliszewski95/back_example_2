import { PaginatedData } from '@application/utils/pagination';
import { Agency } from '@domain/entities/Agency';

export abstract class AbstractAgencyService {
  abstract list(page: number, pageSize: number): Promise<PaginatedData<Agency>>;
}

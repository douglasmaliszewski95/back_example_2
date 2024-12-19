import { PaginatedData } from '@application/utils/pagination';
import { Log } from '@domain/entities/Log';

export abstract class AbstractLogService {
  abstract list(page: number, pageSize: number): Promise<PaginatedData<Log>>;
}

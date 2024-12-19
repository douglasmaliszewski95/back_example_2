import { PaginatedData } from '@application/utils/pagination';
import { RegionOperation } from '@domain/entities/RegionOperation';

export abstract class AbstractRegionOperationService {
  abstract list(page: number, pageSize: number): Promise<PaginatedData<RegionOperation>>;
}

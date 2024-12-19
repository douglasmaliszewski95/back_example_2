import { PaginatedData, paginator } from '@application/utils/pagination';
import { AbstractRegionOperationService } from './abstract-region-operation.service';
import { RegionOperation } from '@domain/entities/RegionOperation';
import { RegionOperationRepository } from '@domain/repositories/region-operation-repository';

export class RegionOperationService implements AbstractRegionOperationService {
  constructor(private regionOperationRepository: RegionOperationRepository) {}

  async list(page: number, pageSize: number): Promise<PaginatedData<RegionOperation>> {
    const regionOperation = await this.regionOperationRepository.findAll();

    const paginatedRegionOperation = paginator(regionOperation, page, pageSize);
    return paginatedRegionOperation;
  }
}

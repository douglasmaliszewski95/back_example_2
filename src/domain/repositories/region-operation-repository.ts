import { RegionOperation } from '@domain/entities/RegionOperation';

export interface RegionOperationRepository {
  findAll(): Promise<RegionOperation[]>;
}

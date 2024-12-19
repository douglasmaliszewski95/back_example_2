import { Agency } from '@domain/entities/Agency';

export interface AgencyRepository {
  findAll(): Promise<Agency[]>;
}

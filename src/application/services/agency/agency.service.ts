import { PaginatedData, paginator } from '@application/utils/pagination';
import { AbstractAgencyService } from './abstract-agency.service';
import { AgencyRepository } from '@domain/repositories/agency-repository';
import { Agency } from '@domain/entities/Agency';

export class AgencyService implements AbstractAgencyService {
  constructor(private agencyRepository: AgencyRepository) {}

  async list(page: number, pageSize: number): Promise<PaginatedData<Agency>> {
    const agencies = await this.agencyRepository.findAll();

    const paginatedAgencies = paginator(agencies, page, pageSize);
    return paginatedAgencies;
  }
}

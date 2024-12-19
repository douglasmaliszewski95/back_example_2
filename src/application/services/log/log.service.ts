import { AbstractLogService } from './abstract-log.service';
import { Log } from '@domain/entities/Log';
import { LogRepository } from '@domain/repositories/log-repository';
import { PaginatedData, paginator } from '@application/utils/pagination';

export class LogService implements AbstractLogService {
  constructor(private logRepository: LogRepository) {}

  async list(page: number, pageSize: number): Promise<PaginatedData<Log>> {
    const logs = await this.logRepository.findAll();

    const paginatedAreas = paginator(logs, page, pageSize);

    return paginatedAreas;
  }
}

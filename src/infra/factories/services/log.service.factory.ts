import { LogRepository } from '@domain/repositories/log-repository';
import { AbstractLogService } from '@application/services/log/abstract-log.service';
import { LogService } from '@application/services/log/log.service';

export default class LogServiceFactory {
  private static logServiceFactory: AbstractLogService;

  static async make(logRepository: LogRepository): Promise<AbstractLogService> {
    if (this.logServiceFactory) {
      return this.logServiceFactory;
    }

    this.logServiceFactory = new LogService(logRepository);
    return this.logServiceFactory;
  }
}

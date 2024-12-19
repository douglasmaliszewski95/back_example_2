import { AbstractLogService } from '@application/services/log/abstract-log.service';
import LogServiceFactory from '../services/log.service.factory';
import LogController from '@application/v1/controllers/log/log.controller';
import { LogPrismaRepository } from '@infra/repositories/log-prisma-repository';
import PrismaFactory from '../prisma.factory';

export default class LogControllerFactory {
  private static logControllerFactory: LogController;
  static async make(logService?: AbstractLogService): Promise<LogController> {
    if (this.logControllerFactory) {
      return this.logControllerFactory;
    }

    const logRepository = new LogPrismaRepository(PrismaFactory.make());

    this.logControllerFactory = new LogController(logService || (await LogServiceFactory.make(logRepository)));
    return this.logControllerFactory;
  }
}

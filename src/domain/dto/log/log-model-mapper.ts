import { Log, LogProps } from '@domain/entities/Log';
import { Logs as LogPrismaModel, SystemActions as SystemActionPrismaModel } from '@prisma/client';

export type LogData = LogPrismaModel & {
  systemActions?: SystemActionPrismaModel;
};

export class LogModelMapper {
  static toEntity(model: LogData) {
    const data: LogProps = {
      logId: model.logId,
      systemActionId: model.systemActionId,
      userId: model.userId,
      date: model.date,
      message: model.message,
    };

    if (model.systemActions) {
      data.systemActions = {
        systemActionId: model.systemActions?.systemActionId,
        name: model.systemActions?.name,
      };
    }

    return new Log(data);
  }
}

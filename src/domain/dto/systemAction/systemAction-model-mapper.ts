import { SystemAction, SystemActionProps } from '@domain/entities/SystemAction';
import { SystemActions as SystemActionPrismaModel } from '@prisma/client';

export class SystemActionModelMapper {
  static toEntity(model: SystemActionPrismaModel) {
    const data: SystemActionProps = {
      systemActionId: model.systemActionId,
      name: model.name,
      excluded: model.excluded,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return new SystemAction(data);
  }
}

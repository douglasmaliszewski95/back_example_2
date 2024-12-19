import { Functionality, FunctionalityProps } from '@domain/entities/Functionality';
import { functionalities as FunctionalitiesPrismaModel } from '@prisma/client';

export class FunctionalityModelMapper {
  static toEntity(model: FunctionalitiesPrismaModel) {
    const data: FunctionalityProps = {
      functionalityId: model.functionalityId,
      name: model.name,
      system: model.system,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return new Functionality(data);
  }
}

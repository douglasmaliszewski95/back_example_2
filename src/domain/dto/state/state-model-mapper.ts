import { State, StateProps } from '@domain/entities/State';
import { States as StatePrismaModel } from '@prisma/client';

export class StateModelMapper {
  static toEntity(model: StatePrismaModel) {
    const data: StateProps = {
      stateId: model.stateId,
      countryId: model.countryId,
      name: model.name,
      stateIsoCode: model.stateIsoCode,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return new State(data);
  }
}

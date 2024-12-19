import { Position, PositionProps } from '@domain/entities/Position';
import {
  positions as PositionPrismaModel,
  regionOperation as RegionOperationPrismaModel,
  userPositions as UserPositionsPrismaModel,
} from '@prisma/client';

export type PositionData = PositionPrismaModel & {
  regionOperation?: RegionOperationPrismaModel;
  userPositions?: UserPositionsPrismaModel[];
};

export class PositionModelMapper {
  static toEntity(model: PositionData) {
    const data: PositionProps = {
      positionId: model.positionId,
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      regionOperationId: model.regionOperationId,
    };

    if (data.regionOperation) {
      data.regionOperation = {
        regionOperationId: model.regionOperation?.regionOperationId,
        name: model.regionOperation?.name,
        createdAt: model.regionOperation?.createdAt,
        updatedAt: model.regionOperation?.updatedAt,
      };
    }

    if (model.userPositions) {
      data.userPositions = model.userPositions.map((userPosition) => ({
        positionId: userPosition.positionId,
      }));
    }

    return new Position(data);
  }
}

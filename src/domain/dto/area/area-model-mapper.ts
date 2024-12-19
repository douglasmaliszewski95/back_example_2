import { Area, AreaProps } from '@domain/entities/Area';
import {
  areas as AreaPrismaModel,
  regionOperation as RegionOperationPrismaModel,
  userAreas as UserAreasPrismaModel,
} from '@prisma/client';

export type AreaData = AreaPrismaModel & {
  regionOperation?: RegionOperationPrismaModel;
  userAreas?: UserAreasPrismaModel[];
};

export class AreaModelMapper {
  static toEntity(model: AreaData) {
    const data: AreaProps = {
      areaId: model.areaId,
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

    if (model.userAreas) {
      data.userAreas = model.userAreas.map((userArea) => ({
        areaId: userArea.areaId,
      }));
    }

    return new Area(data);
  }
}

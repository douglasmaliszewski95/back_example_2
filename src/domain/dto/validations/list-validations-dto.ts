import { Validations, ValidationsProps } from '@domain/entities/Validations';
import { validations as ValidationsPrismaModel } from '@prisma/client';

export type ValidationsData = ValidationsPrismaModel;

export class ValidationsModelMapper {
  static toEntity(model: ValidationsData) {
    const data: ValidationsProps = {
      validationsId: model.validationsId,
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return new Validations(data);
  }
}

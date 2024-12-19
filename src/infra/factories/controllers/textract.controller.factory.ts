import TextractController from '@application/v1/controllers/textract/aws-textract.controller';
import { AbstractTextractService } from '@application/services/aws-textract/abstract-aws-textract.service';
import TextractServiceFactory from '@infra/factories/services/textract.service.factory';
import { ValidationsPrismaRepository } from '@infra/repositories/validations-prisma-repository';
import PrismaFactory from '../prisma.factory';

export default class TextractControllerFactory {
  private static textractControllerFactory: TextractController;
  static async make(textractService?: AbstractTextractService): Promise<TextractController> {
    if (this.textractControllerFactory) {
      return this.textractControllerFactory;
    }
    const validationsRepository = new ValidationsPrismaRepository(PrismaFactory.make());

    this.textractControllerFactory = new TextractController(
      textractService || (await TextractServiceFactory.make(validationsRepository)),
    );
    return this.textractControllerFactory;
  }
}

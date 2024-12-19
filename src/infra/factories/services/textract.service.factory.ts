import { AbstractTextractService } from '@application/services/aws-textract/abstract-aws-textract.service';
import { ValidationsRepository } from '@domain/repositories/validations-repository';

import { TextractService } from '@application/services/aws-textract/textract.service';

export default class TextractServiceFactory {
  private static textractServiceFactory: AbstractTextractService;

  static async make(validationsRepository: ValidationsRepository): Promise<AbstractTextractService> {
    if (this.textractServiceFactory) {
      return this.textractServiceFactory;
    }

    this.textractServiceFactory = new TextractService(validationsRepository);
    return this.textractServiceFactory;
  }
}

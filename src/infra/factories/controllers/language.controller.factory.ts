import { LanguagePrismaRepository } from '@infra/repositories/language-prisma-repository';
import PrismaFactory from '../prisma.factory';
import LanguageController from '@application/v1/controllers/language/language.controller';
import { AbstractLanguageService } from '@application/services/language/abstract-language.service';
import LanguageServiceFactory from '../services/language.service.factory';

export default class LanguageControllerFactory {
  private static languageControllerFactory: LanguageController;

  static async make(languageService?: AbstractLanguageService): Promise<LanguageController> {
    if (this.languageControllerFactory) {
      return this.languageControllerFactory;
    }

    const languageRepository = new LanguagePrismaRepository(PrismaFactory.make());

    this.languageControllerFactory = new LanguageController(
      languageService || (await LanguageServiceFactory.make(languageRepository)),
    );
    return this.languageControllerFactory;
  }
}

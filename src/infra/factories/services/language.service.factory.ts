import { AbstractLanguageService } from '@application/services/language/abstract-language.service';
import { LanguageService } from '@application/services/language/language.service';
import { LanguageRepository } from '@domain/repositories/language-repository';

export default class LanguageServiceFactory {
  private static languageServiceFactory: AbstractLanguageService;

  static async make(languageRepository: LanguageRepository): Promise<AbstractLanguageService> {
    if (this.languageServiceFactory) {
      return this.languageServiceFactory;
    }

    this.languageServiceFactory = new LanguageService(languageRepository);
    return this.languageServiceFactory;
  }
}

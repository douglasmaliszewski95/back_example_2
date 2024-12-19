import { PaginatedData, paginator } from '@application/utils/pagination';
import { AbstractLanguageService } from './abstract-language.service';
import { Language } from '@domain/entities/Language';
import { LanguageRepository } from '@domain/repositories/language-repository';

export class LanguageService implements AbstractLanguageService {
  constructor(private languageRepository: LanguageRepository) {}

  async list(page: number, pageSize: number): Promise<PaginatedData<Language>> {
    const languages = await this.languageRepository.findAll();

    const paginatedlanguages = paginator(languages, page, pageSize);
    return paginatedlanguages;
  }
}

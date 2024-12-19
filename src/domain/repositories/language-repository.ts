import { Language } from '@domain/entities/Language';

export interface LanguageRepository {
  findAll(): Promise<Language[]>;
}

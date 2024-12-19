import { PaginatedData } from '@application/utils/pagination';
import { Language } from '@domain/entities/Language';

export abstract class AbstractLanguageService {
  abstract list(page: number, pageSize: number): Promise<PaginatedData<Language>>;
}

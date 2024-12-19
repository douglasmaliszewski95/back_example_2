import { Language } from '@domain/entities/Language';
import { LanguageRepository } from '@domain/repositories/language-repository';
import { PrismaClient } from '@prisma/client';

export class LanguagePrismaRepository implements LanguageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Language[]> {
    try {
      const models = await this.prisma.language.findMany();

      return models;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

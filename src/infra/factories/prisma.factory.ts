import { PrismaClient } from '@prisma/client';

export default class PrismaFactory {
  private static prisma: PrismaClient;

  static make(): PrismaClient {
    if (this.prisma) {
      return this.prisma;
    }

    this.prisma = new PrismaClient();

    return this.prisma;
  }
}

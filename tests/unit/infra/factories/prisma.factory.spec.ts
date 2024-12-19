import { PrismaClient } from '@prisma/client';
import PrismaFactory from '@infra/factories/prisma.factory';

describe('PrismaFactory unit test', () => {
  let sutPrisma: PrismaClient;

  beforeAll(async () => {
    sutPrisma = PrismaFactory.make();
  });

  it('should return instance of UserService', () => {
    expect(sutPrisma).toBeInstanceOf(PrismaClient);
  });

  test('property userServiceFactory should be defined if its already instanced before', async () => {
    expect(PrismaFactory['prisma']).toBeDefined();
    sutPrisma = PrismaFactory.make();
    expect(sutPrisma).toBeInstanceOf(PrismaClient);
  });
});

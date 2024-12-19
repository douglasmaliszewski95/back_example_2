import { UserService } from '@application/services/user/user.service';
import UserServiceFactory from '../../../../../src/infra/factories/services/user.service.factory';
import { AbstractUserService } from '@application/services/user/abstract-user.service';
import { UserDataBuilder } from '@domain/testing/helpers/user-data-builder';

describe('Health check service factory test', () => {
  let sutService: AbstractUserService;
  let expectOutputUsers: any;
  let mockUserRepository: any;

  beforeAll(async () => {
    expectOutputUsers = {
      ...UserDataBuilder({}),
    };
    mockUserRepository = {
      findAll: jest.fn().mockReturnValue(Promise.resolve([expectOutputUsers])),
      findByLogin: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      createSession: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
    };
    sutService = await UserServiceFactory.make(mockUserRepository);
  });

  it('should return instance of UserService', () => {
    expect(sutService).toBeInstanceOf(UserService);
  });

  test('property userServiceFactory should be defined if its already instanced before', async () => {
    expect(UserServiceFactory['userServiceFactory']).toBeDefined();
    sutService = await UserServiceFactory.make(mockUserRepository);
    expect(sutService).toBeInstanceOf(UserService);
  });
});

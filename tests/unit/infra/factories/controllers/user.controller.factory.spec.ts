import UserController from '@application/v1/controllers/user/user.controller';
import UserServiceFactory from '@infra/factories/services/user.service.factory';
import UserControllerFactory from '@infra/factories/controllers/user.controller.factory';
import { AbstractUserService } from '@application/services/user/abstract-user.service';
import { UserDataBuilder } from '@domain/testing/helpers/user-data-builder';

describe('user controller factory test', () => {
  let sutController: UserController;
  let userService: AbstractUserService;
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
    userService = await UserServiceFactory.make(mockUserRepository);
    sutController = await UserControllerFactory.make(userService);
  });

  it('should return instance of UserController', async () => {
    expect(sutController).toBeInstanceOf(UserController);
  });

  it('property UserControllerFactory should be defined if its already instanced before', async () => {
    expect(UserControllerFactory['userControllerFactory']).toBeDefined();
    sutController = await UserControllerFactory.make(userService);
    expect(sutController).toBeInstanceOf(UserController);
  });
});

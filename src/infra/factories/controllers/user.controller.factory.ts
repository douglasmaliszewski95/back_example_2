import { AbstractUserService } from '@application/services/user/abstract-user.service';
import UserServiceFactory from '../services/user.service.factory';
import UserController from '@application/v1/controllers/user/user.controller';
import { UserPrismaRepository } from '@infra/repositories/user-prisma-repository';
import PrismaFactory from '../prisma.factory';

export default class UserControllerFactory {
  private static userControllerFactory: UserController;
  static async make(userService?: AbstractUserService): Promise<UserController> {
    if (this.userControllerFactory) {
      return this.userControllerFactory;
    }

    const userRepository = new UserPrismaRepository(PrismaFactory.make());

    this.userControllerFactory = new UserController(userService || (await UserServiceFactory.make(userRepository)));
    return this.userControllerFactory;
  }
}

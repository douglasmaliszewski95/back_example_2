import { UserRepository } from '@domain/repositories/user-repository';
import { AbstractUserService } from '@application/services/user/abstract-user.service';
import { UserService } from '@application/services/user/user.service';
import EtherealMail from '@config/mail/providers/EtherealMail';

export default class UserServiceFactory {
  private static userServiceFactory: AbstractUserService;

  static async make(userRepository: UserRepository): Promise<AbstractUserService> {
    if (this.userServiceFactory) {
      return this.userServiceFactory;
    }

    this.userServiceFactory = new UserService(userRepository, new EtherealMail());
    return this.userServiceFactory;
  }
}

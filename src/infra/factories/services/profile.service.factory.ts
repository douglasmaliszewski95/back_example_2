import { AbstractProfileService } from '@application/services/profile/abstract-profile.service';
import { ProfileService } from '@application/services/profile/profile.service';
import { ProfileRepository } from '@domain/repositories/profile-repository';

export default class ProfileServiceFactory {
  private static profileServiceFactory: AbstractProfileService;

  static async make(profileRepository: ProfileRepository): Promise<AbstractProfileService> {
    if (this.profileServiceFactory) {
      return this.profileServiceFactory;
    }

    this.profileServiceFactory = new ProfileService(profileRepository);
    return this.profileServiceFactory;
  }
}

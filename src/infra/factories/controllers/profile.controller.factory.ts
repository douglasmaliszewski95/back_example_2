import PrismaFactory from '../prisma.factory';
import ProfileController from '@application/v1/controllers/profile/profile.controller';
import { AbstractProfileService } from '@application/services/profile/abstract-profile.service';
import ProfileServiceFactory from '../services/profile.service.factory';
import { ProfilePrismaRepository } from '@infra/repositories/profile-prisma-repository';

export default class ProfileControllerFactory {
  private static profileControllerFactory: ProfileController;
  static async make(profileService?: AbstractProfileService): Promise<ProfileController> {
    if (this.profileControllerFactory) {
      return this.profileControllerFactory;
    }

    const profileRepository = new ProfilePrismaRepository(PrismaFactory.make());

    this.profileControllerFactory = new ProfileController(
      profileService || (await ProfileServiceFactory.make(profileRepository)),
    );
    return this.profileControllerFactory;
  }
}

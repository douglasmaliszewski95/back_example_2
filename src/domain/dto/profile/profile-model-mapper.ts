import { Profile, ProfileProps } from '@domain/entities/Profile';
import {
  Profiles as ProfilesPrismaModel,
  regionOperation as RegionOperationPrismaModel,
  userProfiles as UserProfilesPrismaModel,
  ProfileFunctionalities as ProfileFunctionalitiesPrismaModel,
  functionalities as functionalitiesPrismaModel,
} from '@prisma/client';

type ProfileFunctionalities = ProfileFunctionalitiesPrismaModel & {
  functionalities?: functionalitiesPrismaModel;
};

export type ProfileData = ProfilesPrismaModel & {
  regionOperation?: RegionOperationPrismaModel;
  userProfiles?: UserProfilesPrismaModel[];
  ProfileFunctionalities?: ProfileFunctionalities[];
};

export class ProfileModelMapper {
  static toEntity(model: ProfileData) {
    const data: ProfileProps = {
      profileId: model.profileId,
      regionOperationId: model.regionOperationId,
      excluded: model.excluded,
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    if (model.regionOperation) {
      data.regionOperation = {
        regionOperationId: model.regionOperation.regionOperationId,
        name: model.regionOperation.name,
      };
    }

    if (model.userProfiles) {
      data.userProfiles = model.userProfiles.map((userProfile) => ({
        userProfileId: userProfile.userProfileId,
        userId: userProfile.userId,
      }));
    }

    if (model.ProfileFunctionalities) {
      data.profileFunctionalities = model.ProfileFunctionalities.map((profileFunctionality) => ({
        profileFunctionalityId: profileFunctionality.profileFunctionalityId,
        enable: profileFunctionality.enable,
        preview: profileFunctionality.preview,
        maintenance: profileFunctionality.maintenance,
        functionality: profileFunctionality.functionalities
          ? {
              functionalityId: profileFunctionality.functionalities.functionalityId,
              name: profileFunctionality.functionalities.name,
              system: profileFunctionality.functionalities.system,
            }
          : {},
      }));
    }

    // if (model.userProfiles) {
    //   data.userProfiles = model.userProfiles.map((userProfile) => ({
    //     profileId: userProfile.profileId,
    //   }));
    // }

    // if (model.userPostions) {
    //   data.userPositions = model.userPostions.map((userPosition) => ({
    //     positionId: userPosition.positionId,
    //   }));
    // }

    return new Profile(data);
  }
}

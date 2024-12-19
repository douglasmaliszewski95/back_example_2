import { User, UserProps } from '@domain/entities/User';
import {
  Users as UserPrismaModel,
  Addresses as AddressPrismaModel,
  userAreas as UserAreasPrismaModel,
  userAgencies as UserAgenciesPrismaModel,
  userProfiles as UserProfilesPrismaModel,
  userPositions as UserPositionsPrismaModel,
  areas as AreasPrismaModel,
  agencies as AgenciesPrismaModel,
  positions as PositionsPrismaModel,
  Profiles as ProfilesPrismaModel,
  ProfileFunctionalities as ProfileFunctionalitiesPrismaModel,
  functionalities as FunctionalitiesPrismaModel,
  regionOperation as RegionOperationPrismaModel,
  Cities as CitiesPrismaModel,
  States as StatesPrismaModel,
  CorporateData as CorporateDataPrismaModel,
} from '@prisma/client';

type ProfileFunctionalities = ProfileFunctionalitiesPrismaModel & {
  functionalities?: FunctionalitiesPrismaModel;
};

type Profiles = ProfilesPrismaModel & {
  regionOperation?: RegionOperationPrismaModel;
  ProfileFunctionalities?: ProfileFunctionalities[];
};

type UserProfiles = UserProfilesPrismaModel & {
  profiles?: Profiles;
};

type UserAreas = UserAreasPrismaModel & {
  areas?: AreasPrismaModel;
};

type UserAgencies = UserAgenciesPrismaModel & {
  agencies?: AgenciesPrismaModel;
};

type UserPositions = UserPositionsPrismaModel & {
  positions?: PositionsPrismaModel;
};

type Cities = CitiesPrismaModel & {
  states?: StatesPrismaModel;
};

type UserAddress = AddressPrismaModel & {
  cities?: Cities;
};

type UserData = UserPrismaModel & {
  Addresses?: UserAddress[];
  userAreas?: UserAreas[];
  userAgencies?: UserAgencies[];
  userProfiles?: UserProfiles[];
  userPositions?: UserPositions[];
  CorporateData?: CorporateDataPrismaModel | null;
};

export class UserModelMapper {
  static toEntity(model: UserData): User {
    const data: UserProps = {
      userId: model.userId,
      collaboratorId: model.collaboratorId,
      name: model.name,
      userGroupName: model.userGroupName,
      login: model.login,
      nationalIdCard2: model.nationalIdCard2,
      email: model.email,
      enabled: model.enabled,
      userUpdatedAt: model.userUpdatedAt,
      userUpdatedAtMillis: model.userUpdatedAtMillis,
      fieldTeam: model.fieldTeam,
      birthDate: model.birthDate,
      password: model.password,
      updatedPassword: model.updatedPassword,
      acceptedTerms: model.acceptedTerms,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    if (model.Addresses) {
      data.addresses = model.Addresses.map((address) => ({
        addressesId: address.addressesId,
        city: address.cities?.name as string,
        state: address.cities?.states?.name as string,
        neighboarhood: address.neighboarhood,
        address: address.address,
        number: address.number,
        latitude: address.latitude as unknown as number,
        longitude: address.longitude as unknown as number,
        zipCode: address.zipCode,
        complement: address.complement,
      }));
    }

    if (model.CorporateData) {
      data.corporateData = {
        corporateDataId: model.CorporateData.corporateDataId,
        admissionDate: model.CorporateData.admissionDate,
        regionOperation: model.CorporateData.regionOperation,
        temporaryEmployee: model.CorporateData.temporaryEmployee,
        registration: model.CorporateData.registration,
        superior: model.CorporateData.superior,
        resignationDate: model.CorporateData.resignationDate,
      };
    }

    if (model.userAreas) {
      data.userAreas = model.userAreas.map((userArea) => ({
        areaId: userArea.areaId,
        name: userArea.areas?.name,
      }));
    }

    if (model.userAgencies) {
      data.userAgencies = model.userAgencies.map((userAgency) => ({
        agencyId: userAgency.agencyId,
        name: userAgency.agencies?.name,
      }));
    }

    if (model.userPositions) {
      data.userPositions = model.userPositions.map((userPosition) => ({
        positionId: userPosition.positionId,
        name: userPosition.positions?.name,
      }));
    }

    if (model.userProfiles) {
      data.userProfiles = model.userProfiles.map((userProfile) => ({
        profileId: userProfile.profileId,
        name: userProfile.profiles?.name,
        regionOperation: userProfile.profiles?.regionOperation
          ? {
              regionOperationId: userProfile.profiles?.regionOperation?.regionOperationId,
              name: userProfile.profiles?.regionOperation?.name,
            }
          : undefined,
        profileFunctionalities: userProfile.profiles?.ProfileFunctionalities
          ? userProfile.profiles?.ProfileFunctionalities.map((profFunc) => ({
              profileFunctionalityId: profFunc.profileFunctionalityId,
              enable: profFunc.enable,
              preview: profFunc.preview,
              maintenance: profFunc.maintenance,
              functionality: profFunc.functionalities
                ? {
                    functionalityId: profFunc.functionalities.functionalityId,
                    name: profFunc.functionalities.name,
                    system: profFunc.functionalities.system,
                  }
                : undefined,
            }))
          : undefined,
      }));
    }

    return new User(data);
  }
}

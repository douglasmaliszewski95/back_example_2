/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@domain/entities/User';
import { UserRepository } from '../../domain/repositories/user-repository';
import { PrismaClient } from '@prisma/client';
import { UserModelMapper } from '../../domain/dto/user/user-model-mapper';
import { formatISO } from 'date-fns';
import { CreateUserDTO } from '@domain/dto/user/create-user-dto';
import { UpdateUserDTO } from '@domain/dto/user/update-user-dto';
import { UserFilterDto } from '@domain/dto/user/user-filter-dto';

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByCollaboratorId(collaboratorId: number): Promise<User | null> {
    try {
      const model = await this.prisma.users.findFirst({
        where: {
          collaboratorId,
        },
      });

      if (model) return UserModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findBynationalIdCard2(nationalIdCard2: string): Promise<User | null> {
    try {
      const model = await this.prisma.users.findFirst({
        where: {
          nationalIdCard2,
        },
      });

      if (model) return UserModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findByLogin(login: string): Promise<User | null> {
    try {
      const model = await this.prisma.users.findFirst({
        where: {
          login,
        },
      });

      if (model) return UserModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const model = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });

      if (model) return UserModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async insert(dto: CreateUserDTO): Promise<User> {
    try {
      const userData = {
        userId: dto.userId as string,
        collaboratorId: dto.collaboratorId,
        name: dto.name,
        userGroupName: dto.userGroupName,
        login: dto.login,
        nationalIdCard2: dto.nationalIdCard2,
        email: dto.email,
        enabled: dto.enabled,
        userUpdatedAt: dto.userUpdatedAt,
        userUpdatedAtMillis: dto.userUpdatedAtMillis,
        fieldTeam: dto.fieldTeam,
        birthDate: formatISO(dto.birthDate),
        password: dto.password,
        acceptedTerms: formatISO(dto.acceptedTerms),
      };

      const addressData = dto.userAddresses.map((address) => ({
        addressesId: address.addressesId,
        citieId: address.citieId,
        neighboarhood: address.neighboarhood,
        address: address.address,
        number: address.number,
        latitude: address.latitude,
        longitude: address.longitude,
        zipCode: address.zipCode,
        complement: address.complement,
      }));

      const corporateData = {
        admissionDate: dto.corporateData.admissionDate,
        regionOperation: dto.corporateData.regionOperation,
        temporaryEmployee: dto.corporateData.temporaryEmployee,
        registration: dto.corporateData.registration,
        superior: dto.corporateData.superior,
        resignationDate: formatISO(dto.corporateData.resignationDate),
      };

      const userAreasData = dto.userAreas.map((userArea) => ({
        areaId: userArea,
      }));

      const userAgenciesData = dto.userAgencies.map((userAgency) => ({
        agencyId: userAgency,
      }));

      const userProfilesData = dto.userProfiles.map((userProfile) => ({
        profileId: userProfile,
      }));

      const userPositionsData = dto.userPositions.map((userPosition) => ({
        positionId: userPosition,
      }));

      const savedUserModel = await this.prisma.users.create({
        data: {
          ...userData,
          CorporateData: {
            create: corporateData,
          },
          Addresses: {
            create: addressData,
          },
          userAreas: {
            create: userAreasData,
          },
          userAgencies: {
            create: userAgenciesData,
          },
          userProfiles: {
            create: userProfilesData,
          },
          userPositions: {
            create: userPositionsData,
          },
        },
        include: {
          Addresses: this.returnAddressQuery(),
          CorporateData: true,
          userAreas: true,
          userAgencies: true,
          userProfiles: true,
          userPositions: true,
        },
      });

      if (savedUserModel) return UserModelMapper.toEntity(savedUserModel);

      return savedUserModel;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const model = await this.prisma.users.findUnique({
        where: {
          userId: id,
        },
      });

      if (model) return UserModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async show(id: string): Promise<User | null> {
    try {
      const model = await this.prisma.users.findUnique({
        where: {
          userId: id,
        },
        include: {
          Addresses: this.returnAddressQuery(),
          CorporateData: true,
          userAreas: {
            include: {
              areas: true,
            },
          },
          userAgencies: {
            include: {
              agencies: true,
            },
          },
          userProfiles: {
            include: {
              profiles: true,
            },
          },
          userPositions: {
            include: {
              positions: true,
            },
          },
        },
      });

      if (model) return UserModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findAll(userFilterDto: UserFilterDto): Promise<User[]> {
    try {
      const models = await this.prisma.users.findMany({
        where: {
          AND: [
            { name: userFilterDto.employee ? { equals: userFilterDto.employee } : undefined },
            { nationalIdCard2: userFilterDto.nationalId ? { equals: userFilterDto.nationalId } : undefined },
            { enabled: userFilterDto.active === 'true' ? true : userFilterDto.active === 'false' ? false : undefined },
          ],
          userAreas:
            userFilterDto.area && userFilterDto.area.length > 0
              ? {
                  some: {
                    areas: {
                      name: {
                        in: userFilterDto.area,
                      },
                    },
                  },
                }
              : undefined,
          userAgencies:
            userFilterDto.agency && userFilterDto.agency.length > 0
              ? {
                  some: {
                    agencies: {
                      name: {
                        in: userFilterDto.agency,
                      },
                    },
                  },
                }
              : undefined,
          userProfiles:
            userFilterDto.profile && userFilterDto.profile.length > 0
              ? {
                  some: {
                    profiles: {
                      name: {
                        in: userFilterDto.profile,
                      },
                    },
                  },
                }
              : undefined,
          userPositions:
            userFilterDto.position && userFilterDto.position.length > 0
              ? {
                  some: {
                    positions: {
                      name: {
                        in: userFilterDto.position,
                      },
                    },
                  },
                }
              : undefined,
        },
        include: {
          Addresses: this.returnAddressQuery(),
          CorporateData: true,
          userAreas: {
            include: {
              areas: true,
            },
          },
          userAgencies: {
            include: {
              agencies: true,
            },
          },
          userProfiles: {
            include: {
              profiles: true,
            },
          },
          userPositions: {
            include: {
              positions: true,
            },
          },
        },
      });
      return models.map((model) => UserModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async autocomplete(search: string): Promise<User[]> {
    try {
      const models = await this.prisma.users.findMany({
        where: {
          name: { startsWith: search as string },
        },
      });
      return models.map((model) => UserModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async search(search: string): Promise<User[]> {
    try {
      const models = await this.prisma.users.findMany({
        where: {
          OR: [
            { name: { contains: search as string } },
            { collaboratorId: parseInt(search as string) || undefined },
            { userAgencies: { some: { agencies: { name: { contains: search as string } } } } },
            { userPositions: { some: { positions: { name: { contains: search as string } } } } },
            { userAreas: { some: { areas: { name: { contains: search as string } } } } },
          ],
        },
        include: {
          Addresses: this.returnAddressQuery(),
          CorporateData: true,
          userAreas: {
            include: {
              areas: true,
            },
          },
          userAgencies: {
            include: {
              agencies: true,
            },
          },
          userProfiles: {
            include: {
              profiles: true,
            },
          },
          userPositions: {
            include: {
              positions: true,
            },
          },
        },
      });
      return models.map((model) => UserModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async update(dto: UpdateUserDTO): Promise<User> {
    try {
      const userData = {
        collaboratorId: dto.collaboratorId,
        name: dto.name,
        userGroupName: dto.userGroupName,
        login: dto.login,
        nationalIdCard2: dto.nationalIdCard2,
        email: dto.email,
        enabled: dto.enabled,
        userUpdatedAt: dto.userUpdatedAt,
        userUpdatedAtMillis: dto.userUpdatedAtMillis,
        fieldTeam: dto.fieldTeam,
        birthDate: formatISO(dto.birthDate),
      };

      const addressData = dto.userAddresses
        ? dto.userAddresses.map((address) => ({
            citieId: address.citieId,
            neighboarhood: address.neighboarhood,
            address: address.address,
            number: address.number,
            latitude: address.latitude,
            longitude: address.longitude,
            zipCode: address.zipCode,
            complement: address.complement,
          }))
        : [];

      const corporateData = {
        admissionDate: dto.corporateData.admissionDate,
        regionOperation: dto.corporateData.regionOperation,
        temporaryEmployee: dto.corporateData.temporaryEmployee,
        registration: dto.corporateData.registration,
        superior: dto.corporateData.superior,
        resignationDate: formatISO(dto.corporateData.resignationDate),
      };

      const userAreasData = dto.userAreas
        ? dto.userAreas.map((userArea) => ({
            areaId: userArea,
          }))
        : [];

      const userAgenciesData = dto.userAgencies
        ? dto.userAgencies.map((userAgency) => ({
            agencyId: userAgency,
          }))
        : [];

      const userProfilesData = dto.userProfiles
        ? dto.userProfiles.map((userProfile) => ({
            profileId: userProfile,
          }))
        : [];

      const userPositionsData = dto.userPositions
        ? dto.userPositions.map((userPosition) => ({
            positionId: userPosition,
          }))
        : [];

      const savedUserModel = await this.prisma.users.update({
        where: {
          userId: dto.userId,
        },
        data: {
          ...userData,
          CorporateData: {
            update: {
              ...corporateData,
            },
          },
          Addresses: addressData.length
            ? {
                deleteMany: {
                  userId: dto.userId,
                },
                create: addressData,
              }
            : undefined,
          userAreas: userAreasData.length
            ? {
                deleteMany: {
                  userId: dto.userId,
                },
                create: userAreasData,
              }
            : undefined,
          userAgencies: userAgenciesData.length
            ? {
                deleteMany: {
                  userId: dto.userId,
                },
                create: userAgenciesData,
              }
            : undefined,
          userProfiles: userProfilesData.length
            ? {
                deleteMany: {
                  userId: dto.userId,
                },
                create: userProfilesData,
              }
            : undefined,
          userPositions: userPositionsData.length
            ? {
                deleteMany: {
                  userId: dto.userId,
                },
                create: userPositionsData,
              }
            : undefined,
        },
        include: {
          Addresses: this.returnAddressQuery(),
          CorporateData: true,
          userAreas: true,
          userAgencies: true,
          userProfiles: true,
          userPositions: true,
        },
      });

      if (savedUserModel) return UserModelMapper.toEntity(savedUserModel);

      return savedUserModel;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    try {
      await this.prisma.users.update({
        where: {
          userId: userId,
        },
        data: {
          password: newPassword,
          updatedPassword: formatISO(new Date()),
        },
      });
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async enableDisable(id: string, active: boolean): Promise<void> {
    try {
      await this.prisma.users.update({
        where: {
          userId: id,
        },
        data: {
          enabled: active,
          updatedAt: new Date(),
        },
      });
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getUserWithPermissions(id: string): Promise<User | null> {
    try {
      const model = await this.prisma.users.findUnique({
        where: {
          userId: id,
        },
        include: {
          Addresses: this.returnAddressQuery(),
          CorporateData: true,
          userAreas: {
            include: {
              areas: true,
            },
          },
          userAgencies: {
            include: {
              agencies: true,
            },
          },
          userPositions: {
            include: {
              positions: true,
            },
          },
          userProfiles: {
            include: {
              profiles: {
                include: {
                  regionOperation: true,
                  ProfileFunctionalities: {
                    include: {
                      functionalities: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (model) return UserModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  returnAddressQuery() {
    return {
      include: {
        cities: {
          include: {
            states: true,
          },
        },
      },
    };
  }
}

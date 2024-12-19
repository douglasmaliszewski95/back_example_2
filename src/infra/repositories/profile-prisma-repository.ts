/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { ProfileRepository } from '@domain/repositories/profile-repository';
import { Profile } from '@domain/entities/Profile';
import { ProfileModelMapper } from '@domain/dto/profile/profile-model-mapper';
import { CreateProfileDTO } from '@domain/dto/profile/create-profile-dto';
import { UpdateProfileDTO } from '@domain/dto/profile/update-profile-dto';

export class ProfilePrismaRepository implements ProfileRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async insert(dto: CreateProfileDTO): Promise<Profile> {
    try {
      const profileData = {
        regionOperationId: dto.regionOperationId,
        name: dto.name,
      };

      const profileFunctionalitiesDta = dto.profileFunctionalities.map((funcitonallity) => ({
        functionalityId: funcitonallity.functionalityId,
        enable: funcitonallity.enable,
        preview: funcitonallity.preview,
        maintenance: funcitonallity.maintenance,
      }));

      const savedProfileModel = await this.prisma.profiles.create({
        data: {
          ...profileData,
          ProfileFunctionalities: {
            create: profileFunctionalitiesDta,
          },
        },
        include: { ProfileFunctionalities: true, regionOperation: true },
      });

      if (savedProfileModel) return ProfileModelMapper.toEntity(savedProfileModel);

      return savedProfileModel;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async update(dto: UpdateProfileDTO): Promise<Profile> {
    try {
      const profileData = {
        regionOperationId: dto.regionOperationId,
        name: dto.name,
      };

      const profileFunctionalitiesData = dto.profileFunctionalities
        ? dto.profileFunctionalities.map((funcitonality) => ({
            functionalityId: funcitonality.functionalityId,
            enable: funcitonality.enable,
            preview: funcitonality.preview,
            maintenance: funcitonality.maintenance,
          }))
        : [];

      const savedProfileModel = await this.prisma.profiles.update({
        where: {
          profileId: dto.profileId,
        },
        data: {
          ...profileData,
          ProfileFunctionalities: profileFunctionalitiesData.length
            ? {
                deleteMany: {
                  profileId: dto.profileId,
                },
                create: profileFunctionalitiesData,
              }
            : undefined,
        },
        include: {
          ProfileFunctionalities: true,
          regionOperation: true,
        },
      });

      if (savedProfileModel) return ProfileModelMapper.toEntity(savedProfileModel);

      return savedProfileModel;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findByName(name: string): Promise<Profile | null> {
    try {
      const model = await this.prisma.profiles.findFirst({
        where: {
          name,
        },
      });

      if (model) return ProfileModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<Profile | null> {
    try {
      const model = await this.prisma.profiles.findUnique({
        where: {
          profileId: id,
        },
      });

      if (model) return ProfileModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async show(id: string): Promise<Profile | null> {
    try {
      const model = await this.prisma.profiles.findUnique({
        where: {
          profileId: id,
        },
        include: {
          regionOperation: true,
          userProfiles: true,
          ProfileFunctionalities: {
            include: {
              functionalities: true,
            },
          },
        },
      });

      if (model) return ProfileModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findAll(): Promise<Profile[]> {
    try {
      const models = await this.prisma.profiles.findMany({
        where: {
          excluded: false,
        },
        include: {
          regionOperation: true,
          ProfileFunctionalities: {
            include: {
              functionalities: true,
            },
          },
          // userProfiles: true,
        },
      });

      return models.map((model) => ProfileModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.profiles.update({
        where: {
          profileId: id,
        },
        data: {
          excluded: true,
        },
      });
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

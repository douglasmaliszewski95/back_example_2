import { PaginatedData, paginator } from '@application/utils/pagination';
import { AbstractProfileService } from './abstract-profile.service';
import { Profile } from '@domain/entities/Profile';
import { ProfileRepository } from '@domain/repositories/profile-repository';
import AppError from '@domain/exceptions/AppError';
import { NOT_FOUND } from 'http-status';
import { CreateProfileDTO } from '@domain/dto/profile/create-profile-dto';
import { UpdateProfileDTO } from '@domain/dto/profile/update-profile-dto';

export class ProfileService implements AbstractProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async list(page: number, pageSize: number): Promise<PaginatedData<Profile>> {
    const profiles = await this.profileRepository.findAll();

    const paginatedProfiles = paginator(profiles, page, pageSize);

    return paginatedProfiles;
  }

  async show(profileId: string): Promise<Profile | null> {
    const profile = await this.profileRepository.show(profileId);

    if (!profile) {
      throw new AppError('Profile not found', NOT_FOUND);
    }

    return profile;
  }

  async createProfile(profileData: CreateProfileDTO): Promise<Profile> {
    const nameExists = await this.profileRepository.findByName(profileData.name);

    if (nameExists && nameExists.excluded === false) {
      throw new AppError('Profile name already used.');
    }

    const profileDto = new CreateProfileDTO(
      profileData.regionOperationId,
      profileData.name,
      profileData.profileFunctionalities,
    );

    const profile = await this.profileRepository.insert(profileDto);

    return profile;
  }

  async updateProfile(profileId: string, profileData: UpdateProfileDTO): Promise<Profile> {
    const profile = await this.profileRepository.findById(profileId);

    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    const nameExists = await this.profileRepository.findByName(profileData.name);

    if (nameExists && profileData.name !== profile.name) {
      throw new AppError('Profile name already used.');
    }

    const profileDto = new UpdateProfileDTO(
      profileId,
      profileData.regionOperationId,
      profileData.name,
      profileData.profileFunctionalities,
    );

    const profileUpdated = await this.profileRepository.update(profileDto);

    return profileUpdated;
  }

  async delete(profileId: string): Promise<void> {
    //todo: cannot delete profile if there's a user associated with that
    const profile = await this.profileRepository.findById(profileId);

    if (!profile) {
      throw new AppError('Profile not found', NOT_FOUND);
    }

    await this.profileRepository.delete(profileId);
  }
}

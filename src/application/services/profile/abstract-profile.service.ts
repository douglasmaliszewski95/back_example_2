import { PaginatedData } from '@application/utils/pagination';
import { CreateProfileDTO } from '@domain/dto/profile/create-profile-dto';
import { UpdateProfileDTO } from '@domain/dto/profile/update-profile-dto';
import { Profile } from '@domain/entities/Profile';

export abstract class AbstractProfileService {
  abstract list(page: number, pageSize: number): Promise<PaginatedData<Profile>>;
  abstract show(profileId: string): Promise<Profile | null>;
  abstract createProfile(profileData: CreateProfileDTO): Promise<Profile>;
  abstract delete(profileId: string): Promise<void>;
  abstract updateProfile(profileId: string, profileData: UpdateProfileDTO): Promise<Profile>;
}

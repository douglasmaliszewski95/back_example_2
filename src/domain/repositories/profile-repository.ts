import { CreateProfileDTO } from '@domain/dto/profile/create-profile-dto';
import { UpdateProfileDTO } from '@domain/dto/profile/update-profile-dto';
import { Profile } from '@domain/entities/Profile';

export interface ProfileRepository {
  insert(dto: CreateProfileDTO): Promise<Profile>;
  findById(id: string): Promise<Profile | null>;
  findByName(name: string): Promise<Profile | null>;
  show(id: string): Promise<Profile | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Profile[]>;
  update(dto: UpdateProfileDTO): Promise<Profile>;
  // search(field: string, search: string): Promise<User[]>;
}

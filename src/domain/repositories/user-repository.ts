import { CreateUserDTO } from '@domain/dto/user/create-user-dto';
import { UpdateUserDTO } from '@domain/dto/user/update-user-dto';
import { UserFilterDto } from '@domain/dto/user/user-filter-dto';
import { User } from '@domain/entities/User';

export interface UserRepository {
  findByLogin(login: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findByCollaboratorId(collaboratorId: number): Promise<User | null>;

  findBynationalIdCard2(nationalIdCard2: string): Promise<User | null>;

  insert(dto: CreateUserDTO): Promise<User>;

  findById(id: string): Promise<User | null>;

  show(id: string): Promise<User | null>;

  findAll(userFilterDto: UserFilterDto): Promise<User[]>;

  search(search: string): Promise<User[]>;

  autocomplete(search: string): Promise<User[]>;

  update(dto: UpdateUserDTO): Promise<User>;

  updatePassword(userId: string, newPassword: string): Promise<void>;

  enableDisable(id: string, active: boolean): Promise<void>;

  getUserWithPermissions(id: string): Promise<User | null>;
}

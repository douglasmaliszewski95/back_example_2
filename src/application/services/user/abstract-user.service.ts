import { PaginatedData } from '@application/utils/pagination';
import { AutoCompleteOutputDto } from '@domain/dto/user/autocomplete-output-dto';
import { CreateSessionRequestDTO, CreateSessionResponseDTO } from '@domain/dto/user/create-session-dto';
import { CreateUserDTO } from '@domain/dto/user/create-user-dto';

import { ResetPasswordDTO, UpdatePasswordDTO, sendForgotPasswordEmail } from '@domain/dto/user/reset-password-dto';
import { UpdateUserDTO } from '@domain/dto/user/update-user-dto';
import { UserFilterDto } from '@domain/dto/user/user-filter-dto';
import { UserSearchDTO } from '@domain/dto/user/user-search-dto';

import { User } from '@domain/entities/User';

export abstract class AbstractUserService {
  abstract list(page: number, pageSize: number, userFilterDto: UserFilterDto): Promise<PaginatedData<User>>;
  abstract search({ page, pageSize, search }: UserSearchDTO): Promise<PaginatedData<User>>;
  abstract autocomplete(search: string, page: number, pageSize: number): Promise<PaginatedData<AutoCompleteOutputDto>>;
  abstract show(userId: string): Promise<User | null>;
  abstract enableDisable(userId: string): Promise<void>;
  abstract createSession({ login, password }: CreateSessionRequestDTO): Promise<CreateSessionResponseDTO>;
  abstract sendForgotPasswordEmail({ email }: sendForgotPasswordEmail): Promise<string | void>;
  abstract resetPassword({ resetToken, newPassword }: ResetPasswordDTO): Promise<void>;
  abstract updatePassword({ userId, newPassword, password }: UpdatePasswordDTO): Promise<void>;
  abstract createUser(userData: CreateUserDTO): Promise<User>;
  abstract updateUser(userId: string, userData: UpdateUserDTO): Promise<User>;
}

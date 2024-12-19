import { AbstractUserService } from './abstract-user.service';
import { User } from '@domain/entities/User';
import path from 'path';
import { UserRepository } from '@domain/repositories/user-repository';
import { NOT_FOUND, UNAUTHORIZED } from 'http-status';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import AppError from '@domain/exceptions/AppError';
import { CreateSessionRequestDTO, CreateSessionResponseDTO } from '@domain/dto/user/create-session-dto';
import { randomUUID } from 'crypto';
import { ResetPasswordDTO, UpdatePasswordDTO, sendForgotPasswordEmail } from '@domain/dto/user/reset-password-dto';
import { isPast } from 'date-fns';
import { MailProvider } from '@config/mail/providers/MailProvider';
import { CreateUserDTO } from '@domain/dto/user/create-user-dto';
import { PaginatedData, paginator } from '@application/utils/pagination';
import { UserSearchDTO } from '@domain/dto/user/user-search-dto';
import { UpdateUserDTO } from '@domain/dto/user/update-user-dto';
import { UserFilterDto } from '@domain/dto/user/user-filter-dto';
import { AutoCompleteOutputDto } from '@domain/dto/user/autocomplete-output-dto';

export class UserService implements AbstractUserService {
  constructor(
    private userRepository: UserRepository,
    private mailProvider: MailProvider,
  ) {}

  async list(page: number, pageSize: number, userFilterDto: UserFilterDto): Promise<PaginatedData<User>> {
    const users = await this.userRepository.findAll(userFilterDto);

    const usersWithoutPassword = users.map((user) => user.getWithoutPassword());

    const paginatedUsers = paginator(usersWithoutPassword, page, pageSize);

    return paginatedUsers;
  }

  async search({ page, pageSize, search }: UserSearchDTO): Promise<PaginatedData<User>> {
    const users = this.userRepository.search(search);

    const usersWithoutPassword = (await users).map((user) => user.getWithoutPassword());

    const paginatedUsers = paginator(usersWithoutPassword, page, pageSize);

    return paginatedUsers;
  }

  async autocomplete(search: string, page: number, pageSize: number): Promise<PaginatedData<AutoCompleteOutputDto>> {
    const users = this.userRepository.autocomplete(search);

    const userNames = (await users).map((user) => user.getNameAndId());

    const paginatedUsers = paginator(userNames, page, pageSize);

    return paginatedUsers;
  }

  async show(userId: string): Promise<User | null> {
    const user = await this.userRepository.show(userId);

    if (!user) {
      throw new AppError('User not found', NOT_FOUND);
    }

    const userWithoutPassword = user.getWithoutPassword();
    return userWithoutPassword;
  }

  async enableDisable(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', NOT_FOUND);
    }

    await this.userRepository.enableDisable(userId, !user.enabled);
  }

  async createSession({ login, password }: CreateSessionRequestDTO): Promise<CreateSessionResponseDTO> {
    const user = await this.userRepository.findByLogin(login);

    if (!user) {
      throw new AppError('Incorrect email/password combination', UNAUTHORIZED);
    }

    const passwordConfirmed = await compare(password, user.password as string);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', UNAUTHORIZED);
    }

    const token = sign({}, authConfig.jwt.secret as string, {
      subject: user.userId,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const userWithPermissions = await this.userRepository.getUserWithPermissions(user.userId);

    if (!userWithPermissions) {
      throw new Error();
    }

    const userWithoutPassword = userWithPermissions.getWithoutPassword();

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async sendForgotPasswordEmail({ email }: sendForgotPasswordEmail): Promise<string | void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const resetToken = sign({ userId: user.userId }, authConfig.jwt.secret as string, { expiresIn: '1h' });

    const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'views', 'forgot_password.hbs');

    const link = `${resetToken}`;

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Cheil - Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          resetToken,
          link,
        },
      },
    });

    return link;
  }

  async resetPassword({ resetToken, newPassword }: ResetPasswordDTO): Promise<void> {
    let decoded;

    try {
      decoded = verify(resetToken, authConfig.jwt.secret as string) as { exp: number; userId: string };
    } catch (error) {
      throw new AppError('Invalid Token', UNAUTHORIZED);
    }

    const user = await this.userRepository.findById(decoded.userId);

    if (!decoded || this.isTokenExpired(decoded)) {
      throw new AppError('Expired Token', UNAUTHORIZED);
    }

    if (!user) {
      throw new AppError('User not found with this token');
    }

    const hashedPassword = await hash(newPassword, 8);

    await this.userRepository.updatePassword(user.userId, hashedPassword);
  }

  async updatePassword({ userId, newPassword, password }: UpdatePasswordDTO): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    const passwordConfirmed = await compare(password, user.password as string);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect password', UNAUTHORIZED);
    }

    const hashedPassword = await hash(newPassword, 8);

    await this.userRepository.updatePassword(userId, hashedPassword);
  }

  async createUser(userData: CreateUserDTO): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(userData.email);

    if (emailExists) {
      throw new AppError('Email address already used');
    }

    const collaboratorIdExists = await this.userRepository.findByCollaboratorId(userData.collaboratorId);

    if (collaboratorIdExists) {
      throw new AppError('Collaborator Id already used');
    }

    const nationalIdCard2Exist = await this.userRepository.findBynationalIdCard2(userData.nationalIdCard2);

    if (nationalIdCard2Exist) {
      throw new AppError('National Id Card already used');
    }

    const loginExist = await this.userRepository.findByLogin(userData.login);

    if (loginExist) {
      throw new AppError('Login already used');
    }

    //Todo: Validar se os ids das agencias, profiles, areas, etc... existem no banco.
    // Ira dar erro se tentar inserir com ids iválidos

    const hashedPassword = await hash(userData.password, 8);

    const userAddressesWithIds = userData.userAddresses.map((address) => ({
      ...address,
      addressesId: randomUUID(),
    }));

    const userDto = new CreateUserDTO(
      userData.collaboratorId,
      userData.name,
      userData.userGroupName,
      userData.login,
      userData.nationalIdCard2,
      userData.email,
      userData.enabled,
      userData.fieldTeam,
      userData.birthDate,
      hashedPassword,
      userData.acceptedTerms,
      userData.corporateData,
      userData.userProfiles,
      userData.userAgencies,
      userData.userPositions,
      userData.userAreas,
      userAddressesWithIds,
      userData.userUpdatedAt,
      userData.userUpdatedAtMillis,
    );

    const user = await this.userRepository.insert(userDto);

    const userWithoutPassword = user.getWithoutPassword();

    return userWithoutPassword;
  }

  async updateUser(userId: string, userData: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const loginExist = await this.userRepository.findByLogin(userData.login);

    if (loginExist && userData.login !== user.login) {
      throw new AppError('Login already used.');
    }

    const emailExists = await this.userRepository.findByEmail(userData.email);

    if (emailExists && userData.email !== user.email) {
      throw new AppError('Email address already used.');
    }

    const collaboratorIdExists = await this.userRepository.findByCollaboratorId(userData.collaboratorId);

    if (collaboratorIdExists && userData.collaboratorId !== user.collaboratorId) {
      throw new AppError('Collaborator Id already used.');
    }

    const nationalIdCard2Exist = await this.userRepository.findBynationalIdCard2(userData.nationalIdCard2);

    if (nationalIdCard2Exist && userData.nationalIdCard2 !== user.nationalIdCard2) {
      throw new AppError('National Id Card already used.');
    }

    const userDto = new UpdateUserDTO(
      userId,
      userData.collaboratorId,
      userData.name,
      userData.userGroupName,
      userData.login,
      userData.nationalIdCard2,
      userData.email,
      userData.enabled,
      userData.fieldTeam,
      userData.birthDate,
      userData.corporateData,
      userData.userProfiles,
      userData.userAgencies,
      userData.userPositions,
      userData.userAreas,
      userData.userAddresses,
      userData.userUpdatedAt,
      userData.userUpdatedAtMillis,
    );

    const userUpdated = await this.userRepository.update(userDto);

    const userWithoutPassword = userUpdated.getWithoutPassword();

    return userWithoutPassword;
  }

  private isTokenExpired(decodedToken: { exp: number }): boolean {
    const expirationDate = new Date(decodedToken.exp * 1000); // convertendo para milissegundos
    return isPast(expirationDate);
  }
}

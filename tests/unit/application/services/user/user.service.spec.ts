// import { verify, sign } from 'jsonwebtoken';
import { UserService } from '@application/services/user/user.service';
import { UserDataBuilder } from '@domain/testing/helpers/user-data-builder';
import { MockMailProvider } from '../../../../utils/mocks/MockMailProvider';
// import { hash, compare } from 'bcrypt';
import { UserRepository } from '@domain/repositories/user-repository';
// import { UserFilterDto } from '@domain/dto/user/user-filter-dto';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
  sign: jest.fn(),
}));

describe('user-service unit test', () => {
  let service: UserService;
  let expectOutputUsers: any;
  let mockUserRepository: UserRepository;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    expectOutputUsers = {
      ...UserDataBuilder({}, true),
      password: '$2a$12$noZ7WtjU2HMc/IKsF/q2keYenePQDeJ03Vof876oWulF.ZuMIcdA.',
    };

    mockUserRepository = {
      findAll: jest.fn().mockReturnValue(Promise.resolve([expectOutputUsers])),
      findByLogin: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      findByCollaboratorId: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      findBynationalIdCard2: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      insert: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      show: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      findByEmail: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      findById: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      updatePassword: jest.fn().mockReturnValue(Promise.resolve()),
      enableDisable: jest.fn().mockReturnValue(Promise.resolve(null)),
      search: jest.fn(),
      autocomplete: jest.fn(),
      getUserWithPermissions: jest.fn(),
    };

    const mockMailProvider = new MockMailProvider();

    service = new UserService(mockUserRepository, mockMailProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should list all users', async () => {
  //   const page = 1;
  //   const pageSize = 15;
  //   const userFilterDto = {
  //     agency: '',
  //     position: '',
  //     area: '',
  //     profile: '',
  //     employee: '',
  //     nationalId: '',
  //     registrationId: '',
  //     active: true,
  //     sortDir: 'asc',
  //   } as unknown as UserFilterDto;

  //   const users = await service.list(page, pageSize, userFilterDto);
  //   console.log(expectOutputUsers);
  //   expect(mockUserRepository.findAll).toHaveBeenCalled();
  //   expect([expectOutputUsers]).toStrictEqual(users);
  // });

  // it('should create session', async () => {
  //   (sign as jest.Mock).mockReturnValue('mocked-token');
  //   (compare as jest.Mock).mockResolvedValue(true);
  //   const result = await service.createSession({ login: 'usuario', password: 'hashed-password' });

  //   expect(mockUserRepository.findByLogin).toHaveBeenCalled();
  //   expect(result).toHaveProperty('token');
  //   expect(result.user).toEqual(expectOutputUsers);
  // });

  // it('should send Forgot Password Email and return reset link', async () => {
  //   const result = await service.sendForgotPasswordEmail({ email: 'user@teste.com' });

  //   expect(mockUserRepository.findByEmail).toHaveBeenCalled();
  //   expect(typeof result).toBe('string');
  // });

  // it('should reset users password', async () => {
  //   (verify as jest.Mock).mockReturnValue({ exp: '1h', userId: expectOutputUsers.userId });

  //   await expect(
  //     service.resetPassword({
  //       resetToken: 'valid-token',
  //       newPassword: 'new-password',
  //     }),
  //   ).resolves.toBeUndefined();

  //   expect(mockUserRepository.findById).toHaveBeenCalledWith(expectOutputUsers.userId);
  //   expect(hash).toHaveBeenCalledWith('new-password', 8);
  // });
});

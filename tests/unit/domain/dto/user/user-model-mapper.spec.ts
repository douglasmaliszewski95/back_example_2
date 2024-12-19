import { UserModelMapper } from '@domain/dto/user/user-model-mapper';
import { User } from '@domain/entities/User';

// Mocking the UserPrismaModel for testing purposes
const mockUserPrismaModel = {
  userId: '1',
  collaboratorId: '123',
  userUpdatedAt: new Date(),
  name: 'John Doe',
  role: 'Admin',
  userGroupName: 'Admin',
  profileId: '123',
  login: 'john',
  nationalIdCard2: 'test',
  email: 'test@gmail.com',
  enabled: true,
  addressId: '123',
  userUpdatedAtMillis: null,
  fieldTeam: false,
  birthDate: new Date(),
  agency: 'agency',
  area: 'BR',
  corporateDataId: '123',
  createdAt: new Date(),
  updatedAt: new Date(),
} as any;

describe('UserModelMapper', () => {
  it('should map a Prisma model to a User entity without password', () => {
    const user = UserModelMapper.toEntity(mockUserPrismaModel);
    expect(user).toBeInstanceOf(User);
    expect(user.userId).toBe(mockUserPrismaModel.userId);
    expect(user.name).toBe(mockUserPrismaModel.name);
    expect(user.password).toBeUndefined();
  });
});

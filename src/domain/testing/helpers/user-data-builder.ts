import { User } from '@domain/entities/User';
import { faker } from '@faker-js/faker';

type Props = {
  userId?: string | null;
  collaboratorId?: number;
  name?: string;
  userGroupName?: string;
  login?: string;
  nationalIdCard2?: string;
  email?: string;
  enabled?: boolean;
  userUpdatedAt?: string | null;
  userUpdatedAtMillis?: number | null;
  fieldTeam?: boolean;
  birthDate?: Date;
  password?: string | null;
  updatedPassword?: string | null;
  acceptedTerms?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  getWithoutPassword?: () => void;
};

export function UserDataBuilder(props: Props, generateId: boolean = false): User {
  const obj: Props = {
    collaboratorId: props.collaboratorId ?? faker.number.int({ min: 1, max: 100 }),
    name: props.name ?? faker.person.fullName(),
    userGroupName: faker.commerce.department(),
    login: props.login ?? faker.internet.displayName(),
    nationalIdCard2: props.nationalIdCard2 ?? faker.number.int({ min: 1000, max: 5000 }).toString(),
    email: props.email ?? faker.internet.email(),
    enabled: props.enabled ?? true,
    userUpdatedAt: props.userUpdatedAt ?? '',
    userUpdatedAtMillis: props.userUpdatedAtMillis ?? 0,
    fieldTeam: props.fieldTeam ?? Math.random() >= 0.5,
    birthDate: props.birthDate ?? faker.date.birthdate(),
    password: props.password ?? faker.internet.password(),
    updatedPassword: props.updatedPassword ?? faker.internet.password(),
    acceptedTerms: props.acceptedTerms ?? new Date(),
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date(),
    getWithoutPassword: () => {},
  };

  if (generateId) {
    obj.userId = faker.string.uuid();
  }
  return obj as User;
}

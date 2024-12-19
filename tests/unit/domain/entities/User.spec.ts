import { User, UserProps } from '@domain/entities/User';
import { UserDataBuilder } from '@domain/testing/helpers/user-data-builder';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: User;

  beforeEach(() => {
    props = UserDataBuilder({});
    sut = new User(props);
  });

  it('Constructor method', () => {
    expect(sut.email).toEqual(props.email);
    expect(sut.password).toEqual(props.password);
    expect(sut.createdAt);
    expect(sut.collaboratorId).toEqual(props.collaboratorId);
    expect(sut.name).toEqual(props.name);
    expect(sut.userGroupName).toEqual(props.userGroupName);
    expect(sut.login).toEqual(props.login);
    expect(sut.nationalIdCard2).toEqual(props.nationalIdCard2);
    expect(sut.email).toEqual(props.email);
    expect(sut.enabled).toEqual(props.enabled);
    expect(sut.userUpdatedAt).toEqual(props.userUpdatedAt);
    expect(sut.userUpdatedAtMillis).toEqual(props.userUpdatedAtMillis);
    expect(sut.fieldTeam).toEqual(props.fieldTeam);
    expect(sut.birthDate).toEqual(props.birthDate);
    expect(sut.createdAt).toBeInstanceOf(Date);
    expect(sut.updatedAt).toBeInstanceOf(Date);
  });
});

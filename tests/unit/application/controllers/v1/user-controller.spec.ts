import { Request } from 'express';
import { OK, CREATED } from 'http-status';
import UserController from '@application/v1/controllers/user/user.controller';
import { AbstractUserService } from '@application/services/user/abstract-user.service';

describe('UserController unit test', () => {
  let mockUserService: jest.Mocked<AbstractUserService>;
  let sut: UserController;
  let next: any;
  let mockJsonResponse: any;
  let res: any;

  afterAll(async () => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    next = jest.fn();
    mockJsonResponse = jest.fn();
    res = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    mockUserService = {
      list: jest.fn(),
      createSession: jest.fn(),
      sendForgotPasswordEmail: jest.fn(),
      resetPassword: jest.fn(),
      show: jest.fn(),
      enableDisable: jest.fn(),
      createUser: jest.fn(),
      updatePassword: jest.fn(),
      search: jest.fn(),
      autocomplete: jest.fn(),
      updateUser: jest.fn(),
    };
    sut = new UserController(mockUserService);
  });

  it('should execute list request #unit', async () => {
    const req = {
      query: {
        page: 1,
        pageSize: 20,
      },
    } as unknown as Request;

    await sut.list(req, res, next);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalled();
  });

  it('should execute createSession request #unit', async () => {
    const req = { body: { login: 'user', password: '123456' } } as Request;

    await expect(sut.createSession(req, res, next)).resolves.not.toThrow();
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalled();
    expect(mockUserService.createSession).toHaveBeenCalled();
  });

  it('should execute sendForgotPasswordEmail request #unit', async () => {
    const req = { body: { email: 'user@teste.com' } } as Request;

    await expect(sut.sendForgotPasswordEmail(req, res, next)).resolves.not.toThrow();
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalled();
    expect(mockUserService.sendForgotPasswordEmail).toHaveBeenCalled();
  });

  it('should execute resetPassword request #unit', async () => {
    const req = {
      body: {
        reset_token:
          // eslint-disable-next-line max-len
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZTRmYzY2MC1lN2E5LTRhYWUtYWE2Yi00NmY4NWM1MTg2ODgiLCJpYXQiOjE3MDQzOTI4MjMsImV4cCI6MTcwNDM5NjQyM30.gkQ39j0sbqInLSBxKuz6y7ctDZB9Vq0HK4qd-5Gclu0',
        new_password: 'teste3',
      },
    } as Request;

    await expect(sut.resetPassword(req, res, next)).resolves.not.toThrow();
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalled();
    expect(mockUserService.resetPassword).toHaveBeenCalled();
  });

  it('should execute search request #unit', async () => {
    const req = {
      query: {
        page: 1,
        pageSize: 20,
      },
      body: {
        search: 'User',
      },
    } as unknown as Request;

    await sut.search(req, res, next);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalled();
    expect(mockUserService.search).toHaveBeenCalled();
  });

  it('should execute show user request #unit', async () => {
    const req = {
      params: {
        userId: 1,
      },
    } as unknown as Request;

    await sut.show(req, res, next);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalled();
    expect(mockUserService.show).toHaveBeenCalled();
  });

  it('should execute update password request #unit', async () => {
    const req = {
      body: {
        userId: '1',
        newPassword: '123',
        password: '123',
      },
    } as unknown as Request;

    await sut.updatePassword(req, res, next);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalled();
    expect(mockUserService.updatePassword).toHaveBeenCalled();
  });

  it('should execute create user request #unit', async () => {
    const req = {
      body: {
        collaboratorId: '1',
        name: 'User',
        userGroupName: 'User',
        login: 'user',
        nationalIdCard2: '123',
        email: 'user@teste.com',
        enabled: 'true',
        userUpdatedAt: '',
        userUpdatedAtMillis: '',
        fieldTeam: '',
        birthDate: '',
        password: '123',
        updatedPassword: '',
        acceptedTerms: '',
        createdAt: '',
        updatedAt: '',
      },
    } as unknown as Request;

    await sut.createUser(req, res, next);

    await expect(sut.createUser(req, res, next)).resolves.not.toThrow();
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(CREATED);
    expect(mockJsonResponse).toHaveBeenCalled();
    expect(mockUserService.createUser).toHaveBeenCalled();
  });

  it('should execute update user request #unit', async () => {
    const req = {
      body: {
        collaboratorId: '1',
        name: 'User',
        userGroupName: 'User',
        login: 'user',
        nationalIdCard2: '123',
        email: 'user@teste.com',
        enabled: 'true',
        userUpdatedAt: '',
        userUpdatedAtMillis: '',
        fieldTeam: '',
        birthDate: '',
        password: '123',
        updatedPassword: '',
        acceptedTerms: '',
        createdAt: '',
        updatedAt: '',
      },
      params: {
        userId: '1',
      },
    } as unknown as Request;

    await sut.updateUser(req, res, next);

    await expect(sut.updateUser(req, res, next)).resolves.not.toThrow();
    expect(mockUserService.updateUser).toHaveBeenCalledWith('1', req.body);
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalled();
    expect(mockUserService.updateUser).toHaveBeenCalled();
  });

  // it('should execute delete user request #unit', async () => {
  //   const req = {
  //     params: {
  //       userId: 1,
  //     },
  //   } as unknown as Request;

  //   await sut.delete(req, res, next);

  //   expect(res.status).toHaveBeenCalled();
  //   expect(res.status).toHaveBeenCalledWith(NO_CONTENT);
  //   expect(mockJsonResponse).toHaveBeenCalled();
  //   expect(mockUserService.delete).toHaveBeenCalled();
  // });
});

import { Request, Response } from 'express';
import { authValidator } from '../../../../../../src/application/middleware/validators/user/auth-validator';
import { NextFunction } from 'express-serve-static-core';
import AppError from '../../../../../../src/domain/exceptions/AppError';

describe('auth-validator unit tests', () => {
  afterAll(async () => {
    jest.clearAllMocks();
  });

  let next: NextFunction;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    next = jest.fn();
    req = {} as Request;
    res = {} as Response;
  });

  it('Valid case for auth validator class', async () => {
    req.body = {
      login: 'user',
      password: 'teste',
    };
    await expect(authValidator(req, res, next)).resolves.not.toThrow();
  });

  describe('Login field', () => {
    const password = 'teste';
    it('Invalidation cases for name field', async () => {
      req.body = {
        login: 'a',
        password,
      };
      await expect(authValidator(req, res, next)).rejects.toStrictEqual(
        new AppError('"login" length must be at least 3 characters long', 422),
      );

      req.body = {
        login: 2,
        password,
      };
      await expect(authValidator(req, res, next)).rejects.toStrictEqual(new AppError('"login" must be a string', 422));

      req.body = {
        login: '',
        password,
      };
      await expect(authValidator(req, res, next)).rejects.toStrictEqual(
        new AppError('"login" is not allowed to be empty', 422),
      );

      req.body = {
        login: 'a'.repeat(51),
        password,
      };
      await expect(authValidator(req, res, next)).rejects.toStrictEqual(
        new AppError('"login" length must be less than or equal to 50 characters long', 422),
      );
    });
  });

  describe('Password field', () => {
    const login = 'user';
    it('Invalidation cases for password field', async () => {
      req.body = {
        login,
        password: 'a',
      };
      await expect(authValidator(req, res, next)).rejects.toStrictEqual(
        new AppError('"password" length must be at least 3 characters long', 422),
      );

      req.body = {
        login,
        password: 2,
      };
      await expect(authValidator(req, res, next)).rejects.toStrictEqual(
        new AppError('"password" must be a string', 422),
      );

      req.body = {
        login,
        password: '',
      };
      await expect(authValidator(req, res, next)).rejects.toStrictEqual(
        new AppError('"password" is not allowed to be empty', 422),
      );

      req.body = {
        login,
        password: 'a'.repeat(51),
      };
      await expect(authValidator(req, res, next)).rejects.toStrictEqual(
        new AppError('"password" length must be less than or equal to 50 characters long', 422),
      );
    });
  });
});

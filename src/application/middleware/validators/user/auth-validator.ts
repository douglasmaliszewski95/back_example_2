import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const authSchema = Joi.object({
  login: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(3).max(50).required(),
});

export const authValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await authSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

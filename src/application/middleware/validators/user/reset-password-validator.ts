import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const resetPasswordSchema = Joi.object({
  reset_token: Joi.string().min(3).max(200).required(),
  new_password: Joi.string().min(3).max(50).required(),
});

export const resetPasswordValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await resetPasswordSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

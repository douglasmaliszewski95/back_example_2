import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const forgotPasswordSchema = Joi.object({
  email: Joi.string().min(3).max(200).email().required(),
});

export const forgotPasswordValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await forgotPasswordSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

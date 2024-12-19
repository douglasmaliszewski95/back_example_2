import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const updatePasswordSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  newPassword: Joi.string().min(8).max(200).required(),
  password: Joi.string().max(200).required(),
});

export const updatePasswordValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await updatePasswordSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const updateSystemActionSchema = Joi.object({
  name: Joi.string().max(200).required(),
});

export const updateSystemActionValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await updateSystemActionSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

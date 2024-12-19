import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const createFunctionalitySchema = Joi.object({
  name: Joi.string().max(200).required(),
  system: Joi.string().required(),
});

export const createFunctionalityValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await createFunctionalitySchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

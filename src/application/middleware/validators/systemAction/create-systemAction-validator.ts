import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const createSystemActionSchema = Joi.object({
  name: Joi.string().max(200).required(),
});

export const createSystemActionValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await createSystemActionSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const autoCompleteSchema = Joi.object({
  search: Joi.string().min(3).required(),
});

export const autocompleteValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await autoCompleteSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

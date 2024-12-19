import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const rulesByUserSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});

export const rulesByUserValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await rulesByUserSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const stateIdParamSchema = Joi.object({
  stateId: Joi.number().required(),
});

export const stateIdParamValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await stateIdParamSchema.validateAsync(req.params);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};
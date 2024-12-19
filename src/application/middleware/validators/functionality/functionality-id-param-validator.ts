import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const functionalityIdParamSchema = Joi.object({
  functionalityId: Joi.string().uuid().required(),
});

export const functionalityIdParamValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await functionalityIdParamSchema.validateAsync(req.params);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

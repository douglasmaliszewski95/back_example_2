import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const positionIdParamSchema = Joi.object({
  positionId: Joi.string().uuid().required(),
});

export const positionIdParamValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await positionIdParamSchema.validateAsync(req.params);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

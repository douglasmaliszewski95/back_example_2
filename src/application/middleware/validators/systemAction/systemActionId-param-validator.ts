import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const systemActionIdParamSchema = Joi.object({
  systemActionId: Joi.string().uuid().required(),
});

export const systemActionIdParamValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await systemActionIdParamSchema.validateAsync(req.params);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const createPositionSchema = Joi.object({
  name: Joi.string().max(200).required(),
  regionOperationId: Joi.string().required(),
});

export const createPositionValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await createPositionSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

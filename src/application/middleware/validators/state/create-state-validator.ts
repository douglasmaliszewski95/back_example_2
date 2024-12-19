import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const createStateSchema = Joi.object({
  countryId: Joi.number().required(),
  name: Joi.string().max(200).required(),
  stateIsoCode: Joi.string().required(),
});

export const createStateValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await createStateSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

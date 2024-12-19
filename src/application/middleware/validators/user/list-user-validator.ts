import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const listUserScheam = Joi.object({
  agency: Joi.array().items(Joi.string()),
  position: Joi.array().items(Joi.string()),
  area: Joi.array().items(Joi.string()),
  profile: Joi.array().items(Joi.string()),
  employee: Joi.string().max(1000).allow(''),
  nationalId: Joi.string().max(200).allow(''),
  registrationId: Joi.string().max(200).allow(''),
  active: Joi.string().valid('all', 'true', 'false'),
  sortDir: Joi.string().valid('asc', 'desc'),
});

export const listUserValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await listUserScheam.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

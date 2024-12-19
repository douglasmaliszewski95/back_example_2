import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const createProfileSchema = Joi.object({
  name: Joi.string().max(200).required(),
  regionOperationId: Joi.string().uuid().required(),
  profileFunctionalities: Joi.array()
    .items(
      Joi.object({
        functionalityId: Joi.string().uuid().required(),
        enable: Joi.boolean().required(),
        preview: Joi.boolean().required(),
        maintenance: Joi.boolean().required(),
      }).required(),
    )
    .required(),
});

export const CreateProfileValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await createProfileSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

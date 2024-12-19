import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const approveReimbursementSchema = Joi.object({
  reimbursementId: Joi.string().uuid().required(),
  commentary: Joi.string().max(1000).allow('').required(),
});

export const approveReimbursementValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await approveReimbursementSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

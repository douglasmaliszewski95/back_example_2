import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const reimbursementRuleIdParamSchema = Joi.object({
  reimbursementRuleId: Joi.string().uuid().required(),
});

export const reimbursementRuleIdParamValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await reimbursementRuleIdParamSchema.validateAsync(req.params);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

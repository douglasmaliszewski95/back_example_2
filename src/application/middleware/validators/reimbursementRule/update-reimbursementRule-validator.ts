import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const updateRuleSchema = Joi.object({
  valueLimit: Joi.string().required(),
  beginDate: Joi.date().required(),
  rules: Joi.string().required(),
  name: Joi.string().max(200).required(),
  regionOperationId: Joi.string().required(),
  languageId: Joi.string().required(),
  icon: Joi.string().required(),
  excluded: Joi.boolean().required(),
  reimbursementRuleAreas: Joi.array().items(Joi.string().required()),
  reimbursementRulePositions: Joi.array().items(Joi.string().required()),
  reimbursementRuleItens: Joi.array().items(Joi.string().required()),
});

export const updateRuleValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await updateRuleSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

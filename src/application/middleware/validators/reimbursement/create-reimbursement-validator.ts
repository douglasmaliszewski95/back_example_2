import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const createReimbursementSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  reimbursementRulesId: Joi.string().uuid().required(),
  note: Joi.string().required().allow(''),
  status: Joi.string().valid('CONFORMING', 'NON_CONFORMING').required(),
  dateExpense: Joi.date().required(),
  dateRequest: Joi.date().required(),
  valueInvoice: Joi.number().required(),
  valueReimbursement: Joi.number().required(),
  reimbursementsValidation: Joi.array().items(Joi.string().uuid()).required(),
  reimbursementsOCRLog: Joi.array()
    .items(
      Joi.object({
        ocrValue: Joi.number().required(),
        ocrItem: Joi.string().max(1000).required(),
        ocrDate: Joi.date().required(),
      }).required(),
    )
    .required(),
});

export const createReimbursementValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await createReimbursementSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};

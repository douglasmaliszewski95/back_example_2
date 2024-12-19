import AppError from '@domain/exceptions/AppError';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  collaboratorId: Joi.number().required(),
  userGroupName: Joi.string().required(),
  login: Joi.string().max(200).required(),
  nationalIdCard2: Joi.string().required(),
  email: Joi.string().email().max(200).required(),
  enabled: Joi.boolean().required(),
  userUpdatedAt: Joi.string().max(200),
  userUpdatedAtMillis: Joi.number(),
  fieldTeam: Joi.boolean().required(),
  birthDate: Joi.date().required(),
  corporateData: Joi.object({
    admissionDate: Joi.date().allow(null),
    regionOperation: Joi.string().max(1000).allow(''),
    temporaryEmployee: Joi.boolean(),
    registration: Joi.string().allow(''),
    superior: Joi.string().required(),
    resignationDate: Joi.date().required(),
  }).required(),
  userAreas: Joi.array().items(Joi.string().required()),
  userAgencies: Joi.array().items(Joi.string().required()),
  userProfiles: Joi.array().items(Joi.string().required()),
  userPositions: Joi.array().items(Joi.string().required()),
  userAddresses: Joi.array().items(
    Joi.object({
      citieId: Joi.number().required(),
      neighboarhood: Joi.string().max(200).required().allow(''),
      address: Joi.string().max(1000).required().allow(''),
      number: Joi.string().max(50).required().allow(''),
      latitude: Joi.number().required().allow(0),
      longitude: Joi.number().required().allow(0),
      zipCode: Joi.string().max(20).required().allow(''),
      complement: Joi.string().max(200).allow(''),
    }).required(),
  ),
});

export const updateUserValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await updateUserSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppError(err.message, UNPROCESSABLE_ENTITY);
    }
  }
};
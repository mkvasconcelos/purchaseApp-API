import Joi from 'joi';

export const approvalSchema = Joi.object({
  purchaseId: Joi.number().integer().positive().required(),
});

export const approvalStatusSchema = Joi.object({
  status: Joi.boolean().required(),
});

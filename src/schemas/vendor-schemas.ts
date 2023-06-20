import Joi from 'joi';

export const vendorSchema = Joi.object({
  codeSap: Joi.string().required(),
  name: Joi.string().required(),
  fiscalTaxId: Joi.string().length(14).required(),
  email: Joi.string().email().required(),
});

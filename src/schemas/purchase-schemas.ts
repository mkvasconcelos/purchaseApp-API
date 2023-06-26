import Joi from 'joi';

export const purchaseSchema = Joi.object({
  type: Joi.string().valid('New', 'Renewal', 'Adjustment', 'Termination').required(),
  delivery: Joi.string().valid('Recurrent', 'Spot').required(),
  startContract: Joi.string().isoDate().required(),
  endContract: Joi.string().isoDate().required(),
  vendorId: Joi.number().integer().positive().required(),
  observation: Joi.string().required(),
  description: Joi.string().required(),
  approverId: Joi.number().integer().positive().required(),
  listItems: Joi.array()
    .items(
      Joi.object({
        typeId: Joi.string().required(),
        ccId: Joi.string().required(),
        kcId: Joi.string().required(),
        quantity: Joi.number().integer().positive().required(),
        priceUnit: Joi.number().integer().positive().required(),
      }),
    )
    .min(1)
    .required(),
});

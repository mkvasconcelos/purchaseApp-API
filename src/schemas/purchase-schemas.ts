import Joi from 'joi';

export const purchaseSchema = Joi.object({
  type: Joi.string().valid('New', 'Renewal', 'Adjustment', 'Termination').required(),
  delivery: Joi.string().valid('Recurrent', 'Spot').required(),
  description: Joi.string().required(),
  startContract: Joi.string().isoDate().required(),
  endContract: Joi.string().isoDate().required(),
  contract: Joi.string().uri().required(),
  vendorId: Joi.number().integer().required(),
  observation: Joi.string().required(),
  status: Joi.string().valid('Sent', 'Approved', 'Reported').required(),
  listItems: Joi.array()
    .items(
      Joi.object({
        typeId: Joi.string().required(),
        ccId: Joi.string().required(),
        kcId: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().integer().required(),
        priceUnit: Joi.number().integer().required(),
      }),
    )
    .min(1)
    .required(),
});

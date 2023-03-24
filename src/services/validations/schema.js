const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
});

const addSaleSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number().integer().min(1).required()
      .label('productId'),
    quantity: Joi.number().integer().min(1).required()
      .label('quantity'),
  }).messages({
    'any.required': 'The filed {{#label}} is required',
    'string.hex': '{{#label}} must only contain hexadecimal characters',
    'string.min': '{{#label}} length must be at least {{#limit}} characters long',
  }),
);

module.exports = {
  idSchema,
  addProductSchema,
  addSaleSchema,
};

const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
});

module.exports = {
  idSchema,
  addProductSchema,
};

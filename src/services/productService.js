const { productModel } = require('../models');
const { validateId, validateNewProduct } = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const products = await productModel.findById(id);

  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: products };
};

const findByName = async (q) => {
  if (!q) {
    const productAll = await productModel.findAll();
    return { type: null, message: productAll };
  }
  const products = await productModel.findByName(q);

  return { type: null, message: products };
};

const create = async (name) => {
  const error = validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.create({ name });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  create,
  findByName,
};

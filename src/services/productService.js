const productModel = require('../models/productModel');

const httpErrGenerator = (status, message) => ({ status, message });

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const products = await productModel.findById(id);
  if (!products) {
    throw httpErrGenerator(404, 'Product not found');
  }
  return products;
};

module.exports = {
  findAll,
  findById,
};

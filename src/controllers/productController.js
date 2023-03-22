const productService = require('../services/productService');

const findAll = async (_req, res, next) => {
  try {
    const products = await productService.findAll();
    res.status(200).json(products.message);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await productService.findById(id);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findById,
};

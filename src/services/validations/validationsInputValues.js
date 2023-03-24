const { idSchema, addProductSchema, addSaleSchema } = require('./schema');
const { productModel } = require('../../models');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewSale = async (sales) => {
  const { error } = addSaleSchema.validate(sales);

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const product = await Promise.all(
    sales.map(async (sale) => productModel.findById(sale.productId)),
  );

  const productMissing = product.some((prd) => prd === undefined);

  if (productMissing) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
};

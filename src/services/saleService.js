const { saleModel, saleProductModel } = require('../models');
const { validateNewSale } = require('./validations/validationsInputValues');
const { validateId } = require('./validations/validationsInputValues');

const create = async (sales) => {
  const error = await validateNewSale(sales);
  if (error.type) return error;

  const saleId = await saleModel.create();

  await Promise.all(
    sales.map(async (sale) => saleProductModel.create(sale, saleId)),
  );

  const newSale = await saleProductModel.findById(saleId);

  return { type: null, message: { id: saleId, itemsSold: newSale } };
};

const findAll = async () => {
  const products = await saleModel.findAll();

  return { type: null, message: products };
};

const findById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const sale = await saleModel.findById(id);

  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

module.exports = {
  create,
  findAll,
  findById,
};

const { saleModel } = require('../models');
const {
  validateNewSale,
  validateId,
} = require('./validations/validationsInputValues');

const create = async (sales) => {
  const error = await validateNewSale(sales);
  if (error.type) return error;

  const saleId = await saleModel.insertDateSale();

  const newSale = await Promise.all(
    sales.map(async (sale) => saleModel.insertValueSale(sale, saleId)),
  );

  return { type: null, message: { id: saleId, itemsSold: newSale } };
};

const findAll = async () => {
  const products = await saleModel.findAll();

  return { type: null, message: products };
};

const findById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const sale = await saleModel.findByIdJoinSalesProduct(id);

  if (sale.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

const update = async (sale, id) => {
  const error = await validateNewSale(sale);
  if (error.type) return error;

  const saleExists = await saleModel.findByIdJoinSalesProduct(id);
  if (saleExists.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  await Promise.all(sale.map(async (sal) => saleModel.update(sal, id)));

  const updatedSale = await saleModel.findByIdValueSale(id);
  return { type: null, message: { saleId: id, itemsUpdated: updatedSale } };
};

const remove = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const sale = await saleModel.findByIdJoinSalesProduct(id);
  if (sale.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  await saleModel.removeValueIdSale(id);
  await saleModel.removeSalesProduct(id);

  return { type: null, message: '' };
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};

const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const create = async (req, res) => {
  const sales = req.body;
  const { type, message } = await saleService.create(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const findAll = async (req, res) => {
  const { type, message } = await saleService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const { type, message } = await saleService.update(sale, id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleService.remove(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).end();
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};

iu6yi7i7i7i;

const connection = require('./connection');

const create = async () => {
  const query = 'INSERT INTO sales (date) VALUE (NOW())';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const findAll = async () => {
  const query = `SELECT s.id as saleId, s.date, sp.product_id as productId, sp.quantity
  FROM sales as s
    INNER JOIN sales_products as sp ON s.id = sp.sale_id ORDER BY s.id, sp.product_id;`;
  const [result] = await connection.execute(query);
  return result;
};

const findById = async (id) => {
  const query = `SELECT s.date, sp.product_id as productId, sp.quantity FROM sales as s
    INNER JOIN sales_products as sp ON s.id = sp.sale_id WHERE s.id = ? ;`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
};

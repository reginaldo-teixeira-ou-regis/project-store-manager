const connection = require('./connection');

const create = async (sale, id) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [{ insertId }] = await connection.execute(
    query,
    [id, sale.productId, sale.quantity],
  );
  return insertId;
};

const findById = async (id) => {
  const query = 'SELECT product_id as productId, quantity FROM sales_products WHERE sale_id = ?';
  const [product] = await connection.execute(query, [id]);
  return product;
};

module.exports = {
  create,
  findById,
};

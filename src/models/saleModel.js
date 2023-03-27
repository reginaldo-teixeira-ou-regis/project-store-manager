const connection = require('./connection');

const insertDateSale = async () => {
  const query = 'INSERT INTO sales (date) VALUE (NOW())';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const insertValueSale = async (sale, id) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  await connection.execute(
    query,
    [id, sale.productId, sale.quantity],
  );
  return { productId: sale.productId, quantity: sale.quantity };
};

const findAll = async () => {
  const query = `SELECT s.id as saleId, s.date, sp.product_id as productId, sp.quantity
  FROM sales as s
    INNER JOIN sales_products as sp ON s.id = sp.sale_id ORDER BY s.id, sp.product_id;`;
  const [result] = await connection.execute(query);
  return result;
};

const findByIdValueSale = async (id) => {
  const query = 'SELECT product_id as productId, quantity FROM sales_products WHERE sale_id = ?';
  const [product] = await connection.execute(query, [id]);
  return product;
};

const findByIdJoinSalesProduct = async (id) => {
  const query = `SELECT s.date, sp.product_id as productId, sp.quantity FROM sales as s
    INNER JOIN sales_products as sp ON s.id = sp.sale_id WHERE s.id = ? ;`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const update = async (sale, id) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ? ';
  const [{ insertId }] = await connection.execute(
    query,
    [sale.quantity, id, sale.productId],
  );
  return insertId;
};

const removeValueIdSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(query, [id]);
};

const removeSalesProduct = async (id) => {
  const query = 'DELETE FROM sales_products WHERE sale_id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  insertDateSale,
  insertValueSale,
  findAll,
  findByIdValueSale,
  findByIdJoinSalesProduct,
  update,
  removeValueIdSale,
  removeSalesProduct,
};

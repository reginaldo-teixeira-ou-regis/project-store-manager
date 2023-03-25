const connection = require('./connection');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [products] = await connection.execute(query);
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[products]] = await connection.execute(query, [id]);
  console.log(products);
  return products;
};

const findByName = async (q) => {
  const query = 'SELECT * FROM products WHERE name LIKE ?';
  const [products] = await connection.execute(query, [`%${q}%`]);
  return products;
};

const create = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUE (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const update = async (name, id) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  const [{ insertId }] = await connection.execute(query, [name, id]);
  return insertId;
};

const remove = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  findAll,
  findById,
  findByName,
  create,
  update,
  remove,
};

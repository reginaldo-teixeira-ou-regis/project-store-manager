const connection = require('./connection');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [products] = await connection.execute(query);
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[products]] = await connection.execute(query, [id]);
  return products;
};

module.exports = {
  findAll,
  findById,
};

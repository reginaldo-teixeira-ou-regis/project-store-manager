module.exports = async (req, res, next) => {
  const sales = req.body;

  const validateProductId = sales.some((sale) => !sale.productId);
  const validateQuantity = sales.some(
    (sale) => sale.quantity === undefined && sale.quantity !== Number('0'),
  );

  if (validateProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (validateQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};

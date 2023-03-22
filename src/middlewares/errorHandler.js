const errorHandler = (error, _req, res, _next) => {
  console.log(error);
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

module.exports = errorHandler;

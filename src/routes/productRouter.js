const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findById);
router.post('/', productController.create);

module.exports = router;

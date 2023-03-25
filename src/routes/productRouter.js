const express = require('express');
const { productController } = require('../controllers');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productController.findAll);
router.get('/search', productController.findByName);
router.get('/:id', productController.findById);
router.post('/', validateName, productController.create);
router.put('/:id', validateName, productController.update);
router.delete('/:id', productController.remove);

module.exports = router;

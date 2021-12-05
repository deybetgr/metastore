const { Router } = require('express');

const router = Router();

const { validate, result } = require('../middlewares/products.middlewares');

const {
	createProduct,
	getProduct,
	updateProduct,
	deleteProduct,
	listProducts,
} = require('../controllers/products.controllers');

router.post('/', validate('createProduct'), result, createProduct);
router.get('/:id', validate('getProduct'), result, getProduct);
router.get('/', validate('listProducts'), result, listProducts);
router.put('/:id', validate('updateProduct'), result, updateProduct);
router.delete('/:id', validate('deleteProduct'), result, deleteProduct);

module.exports = router;

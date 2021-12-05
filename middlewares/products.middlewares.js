const { check, validationResult } = require('express-validator');
const { ObjectId } = require('bson');

const { validateFile } = require('../util/validateFile');
const ProductsValidation = require('../util/validateDatabase');

const { Api400Error } = require('../util/baseError');

const validate = method => {
	switch (method) {
		case 'createProduct': {
			return [
				check('sku', 'Enter a sku')
					.exists()
					.bail()
					.isString()
					.withMessage('Enter a valid sku')
					.bail()
					.trim()
					.notEmpty()
					.withMessage('Enter a sku')
					.bail()
					.custom((sku, { req }) =>
						ProductsValidation.checkDuplicate(req, 'sku', sku)
					),
				check('slug', 'Enter a slug')
					.exists()
					.bail()
					.isString()
					.withMessage('Enter a valid slug')
					.bail()
					.trim()
					.notEmpty()
					.withMessage('Enter a slug')
					.bail()
					.isSlug()
					.withMessage('Enter a valid slug')
					.bail()
					.custom((slug, { req }) =>
						ProductsValidation.checkDuplicate(req, 'slug', slug)
					),
				check('item', 'Enter a item name')
					.exists()
					.bail()
					.isString()
					.withMessage('Enter a valid item name')
					.bail()
					.trim()
					.notEmpty()
					.withMessage('Enter a item name')
					.bail()
					.custom((item, { req }) =>
						ProductsValidation.checkDuplicate(req, 'item', item)
					),
				check('description')
					.optional()
					.isString()
					.withMessage('Enter a valid description')
					.trim(),
				check('status', 'Enter a status')
					.exists()
					.bail()
					.isBoolean()
					.withMessage('Enter a valid status')
					.toBoolean(),
				check('available', 'Enter an available status')
					.exists()
					.bail()
					.isBoolean()
					.withMessage('Enter a valid available status')
					.toBoolean(),
				check('tags').optional().isArray().withMessage('Enter valid tags'),
				check('tags.*')
					.optional()
					.isString()
					.withMessage('Enter a valid tag')
					.bail()
					.trim()
					.notEmpty()
					.withMessage('Enter a tag'),
				check('quantity', 'Enter a quantity')
					.exists()
					.bail()
					.isInt({ min: 0 })
					.withMessage('Enter a valid quantity')
					.toInt(),
				check('pricing', 'Enter a pricing')
					.exists()
					.bail()
					.isObject()
					.withMessage('Enter a valid pricing'),
				check('pricing.list', 'Enter a price list')
					.exists()
					.bail()
					.isFloat({ min: 0 })
					.withMessage('Enter a valid price list')
					.toFloat(),
				check('pricing.sale', 'Enter a price sale')
					.exists()
					.bail()
					.isFloat({ min: 0 })
					.withMessage('Enter a valid price sale')
					.toFloat(),
				check('pricing.discount')
					.optional()
					.isInt({ min: 0, max: 100 })
					.withMessage('Enter a valid discount')
					.toInt(),
				check('file', 'Enter a valid file')
					.optional()
					.isString()
					.bail()
					.trim()
					.custom(file => validateFile(file)),
			];
		}
		case 'getProduct': {
			return [
				check('id', 'Product ID Invalid')
					.isMongoId()
					.bail()
					.customSanitizer(id => ObjectId(id)),
			];
		}
		case 'listProducts': {
			return [];
		}
		case 'updateProduct': {
			return [
				check('id', 'Product ID Invalid')
					.isMongoId()
					.bail()
					.customSanitizer(id => ObjectId(id))
					.custom((id, { req }) => ProductsValidation.checkId(id, req)),
				check('sku', 'Enter a sku')
					.exists()
					.bail()
					.isString()
					.withMessage('Enter a valid sku')
					.bail()
					.trim()
					.notEmpty()
					.withMessage('Enter a sku')
					.bail()
					.custom((sku, { req }) =>
						ProductsValidation.checkDuplicate(req, 'sku', sku)
					),
				check('slug', 'Enter a slug')
					.exists()
					.bail()
					.isString()
					.withMessage('Enter a valid slug')
					.bail()
					.trim()
					.notEmpty()
					.withMessage('Enter a slug')
					.bail()
					.isSlug()
					.withMessage('Enter a valid slug')
					.bail()
					.custom((slug, { req }) =>
						ProductsValidation.checkDuplicate(req, 'slug', slug)
					),
				check('item', 'Enter a item name')
					.exists()
					.bail()
					.isString()
					.withMessage('Enter a valid item name')
					.bail()
					.trim()
					.notEmpty()
					.withMessage('Enter a item name')
					.bail()
					.custom((item, { req }) =>
						ProductsValidation.checkDuplicate(req, 'item', item)
					),
				check('description')
					.optional()
					.isString()
					.withMessage('Enter a valid description')
					.trim(),
				check('status', 'Enter a status')
					.exists()
					.bail()
					.isBoolean()
					.withMessage('Enter a valid status')
					.toBoolean(),
				check('available', 'Enter an available status')
					.exists()
					.bail()
					.isBoolean()
					.withMessage('Enter a valid available status')
					.toBoolean(),
				check('tags').optional().isArray().withMessage('Enter valid tags'),
				check('tags.*')
					.optional()
					.isString()
					.withMessage('Enter a valid tag')
					.bail()
					.trim()
					.notEmpty()
					.withMessage('Enter a tag'),
				check('quantity', 'Enter a quantity')
					.exists()
					.bail()
					.isInt({ min: 0 })
					.withMessage('Enter a valid quantity')
					.toInt(),
				check('pricing', 'Enter a pricing')
					.exists()
					.bail()
					.isObject()
					.withMessage('Enter a valid pricing'),
				check('pricing.list', 'Enter a price list')
					.exists()
					.bail()
					.isFloat({ min: 0 })
					.withMessage('Enter a valid price list')
					.toFloat(),
				check('pricing.sale', 'Enter a price sale')
					.exists()
					.bail()
					.isFloat({ min: 0 })
					.withMessage('Enter a valid price sale')
					.toFloat(),
				check('pricing.discount')
					.optional()
					.isInt({ min: 0, max: 100 })
					.withMessage('Enter a valid discount')
					.toInt(),
				check('file', 'Enter a valid file')
					.optional()
					.isString()
					.bail()
					.trim()
					.custom(file => validateFile(file)),
			];
		}
		case 'deleteProduct': {
			return [
				check('id', 'Product ID Invalid')
					.isMongoId()
					.bail()
					.customSanitizer(id => ObjectId(id))
					.custom((id, { req }) => ProductsValidation.checkId(id, req)),
			];
		}
	}
};

const result = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new Api400Error('Product Validation', errors.array());
	}

	next();
};

module.exports = {
	validate,
	result,
};

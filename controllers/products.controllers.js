const { Product } = require('../models/products');
const Products = require('../services/products.services');

const { uploadFile } = require('../util/uploadFile');
const { deleteFile } = require('../util/deleteFile');

const { Api404Error } = require('../util/baseError');

async function createProduct(req, res, next) {
	const product = new Product(req.body).get();
	const { file } = req.body;

	try {
		if (file) {
			product.images = [await uploadFile(file)];
		}

		const response = await Products.create(product);

		res.status(201).json(response);
	} catch (e) {
		next(e);
	}
}

async function getProduct(req, res, next) {
	const { id } = req.params;

	try {
		const product = await Products.get(id);
		if (!product) throw new Api404Error('Unable to get product');

		res.json(product);
	} catch (e) {
		next(e);
	}
}

async function listProducts(req, res, next) {
	try {
		const products = await Products.list();

		res.json(products);
	} catch (e) {
		next(e);
	}
}

async function updateProduct(req, res, next) {
	const { id } = req.params;
	const product = new Product(req.body, req.product).update();
	const { file } = req.body;

	try {
		if (file) {
			if (req.product.images) await deleteFile(req.product.images[0].fileId);
			product.images = [await uploadFile(file)];
		}

		const response = await Products.update(id, product);

		res.json(response);
	} catch (e) {
		next(e);
	}
}

async function deleteProduct(req, res, next) {
	const { id } = req.params;

	try {
		if (req.product.images) await deleteFile(req.product.images[0].fileId);

		const response = await Products.delete(id);

		res.json(response);
	} catch (e) {
		next(e);
	}
}

module.exports = {
	createProduct,
	getProduct,
	listProducts,
	updateProduct,
	deleteProduct,
};

const { mongoURI } = require('../config/environment');
const { MongoClient } = require('mongodb');

const ProductsDAO = require('../services/products.services');
const ProductsValidationDAO = require('../util/validateDatabase');

async function mongoDB() {
	try {
		const client = await MongoClient.connect(mongoURI, {
			serverSelectionTimeoutMS: 5000,
		});

		await ProductsDAO.injectDB(client);
		await ProductsValidationDAO.injectDB(client);
		console.log('Connect to database successful');
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

module.exports = mongoDB;

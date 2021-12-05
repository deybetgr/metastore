const { databaseName } = require('../config/environment');

let products;

class ProductsDAO {
	static async injectDB(conn) {
		if (products) {
			return;
		}
		try {
			products = await conn.db(databaseName).collection('products');
		} catch (e) {
			console.error(
				`Unable to establish collection handles in productsDAO: ${e}`
			);
		}
	}

	static async create(fields) {
		return await products.insertOne(fields);
	}

	static async get(id) {
		return await products.findOne(id);
	}

	static async list() {
		return await products.find().toArray();
	}

	static async update(id, fields) {
		return await products.updateOne({ _id: id }, { $set: fields });
	}

	static async delete(id) {
		return await products.deleteOne({ _id: id });
	}
}

module.exports = ProductsDAO;

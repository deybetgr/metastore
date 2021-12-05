const { databaseName } = require('../config/environment');

let products;

class ProductsValidationDAO {
	static async injectDB(conn) {
		if (products) {
			return;
		}
		try {
			products = await conn.db(databaseName).collection('products');
		} catch (e) {
			console.error(
				`Unable to establish collection handles in ProductsValidationDAO: ${e}`
			);
		}
	}

	static async checkDuplicate(req, field, value) {
		const { id } = req.params;

		const query = {};

		if (id) query['_id'] = { $ne: id };
		query[field] = { $regex: `${value}$`, $options: 'i' };

		const exist = await products.findOne(query);

		if (exist) throw new Error(`${field} already in use`);

		return true;
	}

	static async checkId(id, req) {
		const exist = await products.findOne(id);

		if (!exist) throw new Error(`The ID: ${id} does not exist`);

		req.product = exist;

		return true;
	}
}

module.exports = ProductsValidationDAO;

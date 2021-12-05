function Product(p, optionalFields) {
	const {
		sku,
		slug,
		item,
		description,
		status,
		available,
		tags,
		quantity,
		pricing: { list, sale, discount },
	} = p;

	this.get = function () {
		return {
			sku: sku,
			slug: slug,
			item: item,
			description: description || '',
			status: status,
			available: available,
			tags: tags || [],
			quantity: quantity,
			pricing: {
				list: list,
				sale: sale,
				discount: discount || 0,
			},
			total_reviews: 0,
			created_at: new Date(),
		};
	};

	this.update = function () {
		return {
			sku: sku,
			slug: slug,
			item: item,
			description: description || optionalFields.description || '',
			status: status,
			available: available,
			tags: tags || optionalFields.tags || [],
			quantity: quantity,
			pricing: {
				list: list,
				sale: sale,
				discount: discount || optionalFields.pricing.discount || 0,
			},
			updated_at: new Date(),
		};
	};
}

module.exports = { Product };

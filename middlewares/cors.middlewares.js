function cors(req, res, next) {
	const origin = req.headers.origin;

	res.setHeader('Access-Control-Allow-Origin', origin || '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Max-Age', '86400');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
	);

	next();
}

module.exports = cors;

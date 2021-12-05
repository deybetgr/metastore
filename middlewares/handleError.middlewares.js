const STATUS_CODES = require('http').STATUS_CODES;
const { BaseError } = require('../util/baseError');

function logError(err, req, res, next) {
	console.error(err); // winston-morgan-pino
	next(err);
}

function clientHandleError(err, req, res, next) {
	if (res.headersSent) return next(err);
	if (!isOperationalError(err)) return next(err);

	const statusCode = err.statusCode || 500;
	const errorMessage = err.message || STATUS_CODES[statusCode];
	res
		.status(statusCode)
		.json({ error: errorMessage, validations: err.validations });
}

function isOperationalError(err) {
	if (err instanceof BaseError) {
		return err.isOperational;
	}
	return false;
}

function syntaxError(err, req, res, next) {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		res.status(400).json({
			error: 'Malformed JSON',
		});
	} else {
		next(err);
	}
}

function notFound(req, res) {
	res.status(404).json({
		error: 'You reached a route that is not defined on this server',
	});
}

function payloadTooLarge(err, req, res, next) {
	if (err.status === 413) {
		res.status(413).json({ error: STATUS_CODES[413] });
	} else {
		next(err);
	}
}

function handleError(err, req, res, next) {
	res.status(500).json({ error: STATUS_CODES[500] });
}

module.exports = {
	logError,
	clientHandleError,
	isOperationalError,
	syntaxError,
	notFound,
	payloadTooLarge,
	handleError,
};

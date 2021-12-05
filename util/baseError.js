const STATUS_CODES = require('http').STATUS_CODES;
const isOperational = true;

class BaseError extends Error {
	constructor(name, statusCode, isOperational, message) {
		super(message);

		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name;
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		Error.captureStackTrace(this);
	}
}

class Api400Error extends BaseError {
	constructor(message, validations = []) {
		super(STATUS_CODES[400], 400, isOperational, message);
		this.validations = validations;
	}
}

class Api404Error extends BaseError {
	constructor(message) {
		super(STATUS_CODES[404], 404, isOperational, message);
	}
}

module.exports = {
	BaseError,
	Api400Error,
	Api404Error,
};

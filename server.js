'use strict';
const Server = require('./models/server');
const { isOperationalError } = require('./middlewares/handleError.middlewares');

const server = new Server();

process.on('unhandledRejection', err => {
	throw err;
});

process.on('uncaughtException', err => {
	console.error(err);
	if (!isOperationalError(err)) {
		process.exit(1);
	}
});

server.listen();

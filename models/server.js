const express = require('express');
const { port } = require('../config/environment');
const helmet = require('helmet');
const cors = require('../middlewares/cors.middlewares');
const fileUpload = require('express-fileupload');
const mongoDB = require('../database/config');
const {
	logError,
	clientHandleError,
	syntaxError,
	notFound,
	payloadTooLarge,
	handleError,
} = require('../middlewares/handleError.middlewares');

class Server {
	constructor() {
		this.app = express();
		this.path = {
			products: '/api/v1/products',
		};
		this.middlewares();
		this.routes();
		this.handleError();
	}

	middlewares() {
		this.app.use(helmet());
		this.app.use(cors);
		this.app.use(express.json({ limit: '10mb' }));
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use('/', express.static('public'));
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: '/tmp/',
				createParentPath: true,
			})
		);
	}

	routes() {
		this.app.use(this.path.products, require('../routes/products.routes'));
	}

	handleError() {
		this.app.use(logError);
		this.app.use(clientHandleError);
		this.app.use(syntaxError);
		this.app.use(payloadTooLarge);
		this.app.use(notFound);
		this.app.use(handleError);
	}

	async listen() {
		await mongoDB();
		this.app.listen(port, () => {
			console.log(`Server listening on port: ${port}`);
		});
	}
}

module.exports = Server;

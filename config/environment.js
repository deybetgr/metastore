require('dotenv').config();

module.exports = {
	port: process.env.PORT,
	adminPassword: process.env.ADMIN_PASSWORD,
	jwtSecret: process.env.JWT_SECRET,
	mongoURI: process.env.MONGO_URI,
	databaseName: process.env.DATABASE_NAME,
	publicKey_ImageKit: process.env.PUBLICKEY_IMAGEKIT,
	privateKey_ImageKit: process.env.PRIVATEKEY_IMAGEKIT,
	urlEndpoint_ImageKit: process.env.URLENDPOINT_IMAGEKIT,
};

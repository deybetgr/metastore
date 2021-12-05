const ImageKit = require('imagekit');

const {
	publicKey_ImageKit,
	privateKey_ImageKit,
	urlEndpoint_ImageKit,
} = require('../config/environment');

const CONFIG_OPTIONS = {
	publicKey: publicKey_ImageKit,
	privateKey: privateKey_ImageKit,
	urlEndpoint: urlEndpoint_ImageKit,
};

const deleteFile = async fileId => {
	const imagekit = new ImageKit(CONFIG_OPTIONS);

	return await imagekit.deleteFile(fileId);
};

module.exports = {
	deleteFile,
};

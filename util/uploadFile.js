const ImageKit = require('imagekit');
const sharp = require('sharp');

const {
	publicKey_ImageKit,
	privateKey_ImageKit,
	urlEndpoint_ImageKit,
	databaseName,
} = require('../config/environment');

const CONFIG_OPTIONS = {
	publicKey: publicKey_ImageKit,
	privateKey: privateKey_ImageKit,
	urlEndpoint: urlEndpoint_ImageKit,
};

const FILE_NAME = databaseName;

const uploadFile = async file => {
	const imagekit = new ImageKit(CONFIG_OPTIONS);

	const arrayFile = file.split(';');
	const imageData = arrayFile[1].split(',')[1];

	const img = Buffer.from(imageData, 'base64');
	const resizedImageBuffer = await sharp(img)
		.resize({ width: 840, height: 840 })
		.webp({ quality: 80 })
		.toBuffer();

	const resizedImageData = resizedImageBuffer.toString('base64');

	const { fileId, url, thumbnailUrl } = await imagekit.upload({
		file: resizedImageData,
		fileName: `${FILE_NAME}_bin`,
		folder: 'products',
	});

	return {
		fileId,
		url,
		thumbnailUrl,
	};
};

module.exports = {
	uploadFile,
};

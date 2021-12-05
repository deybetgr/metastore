const allowedExtensions = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];

const validateFile = file => {
	// data:[<mediatype>][;base64],<data>
	// data:image/png;base64,iVBORw0KGgoAAA...

	try {
		const arrayFile = file.split(';');
		const mimeType = arrayFile[0].split(':')[1];
		const image = mimeType.split('/')[0];
		const extension = mimeType.split('/')[1];

		if (image !== 'image') {
			throw new Error('Only images are supported');
		}

		if (!allowedExtensions.includes(extension)) {
			throw new Error(
				`The ${extension} extension is not allowed. See the following allowed extensions: ${allowedExtensions}`
				// `La extensión ${extension} no es permitida. Consulte las siguientes extensiones permitidas: ${allowedExtensions}`
			);
		}

		return true;
	} catch (err) {
		throw new Error(err.message);
	}
};

module.exports = {
	validateFile,
};

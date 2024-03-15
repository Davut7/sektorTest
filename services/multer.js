import multer from 'multer';

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];

const maxFileSize = 10 * 1024 * 1024;

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (!allowedFileTypes.includes(file.mimetype)) {
		return cb(
			new Error(
				'Invalid file type. Only JPEG and PNG images are allowed.'
			)
		);
	}

	if (file.size > maxFileSize) {
		return cb(
			new Error(
				'File size exceeds the limit. Maximum size allowed is 10MB.'
			)
		);
	}

	cb(null, true);
};

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
});

export default upload;

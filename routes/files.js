const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/files');
	},
	filename: (req, file, cb) => {
		cb(null, `${ Date.now() }_${ file.originalname }`);
	},
})

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
	console.log(req.file, req.body);

	return res.json({ status: 'OK' });
});

module.exports = router;
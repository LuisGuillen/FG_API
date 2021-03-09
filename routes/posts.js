const express = require('express');
const router = express.Router();
const multer = require('multer');
const url = require('url');
const connection = require('../db/connection');
const query = require('../db/query');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/files');
	},
	filename: (req, file, cb) => {
		cb(null, `${ Date.now() }_${ file.originalname.replace(/ /g, '_') }`);
	},
})

const upload = multer({ storage });

router.get('/:id', async(req, res) => {
	const { id } = req.params;
	const conn = await connection().catch(console.error);
	const sql = `
		SELECT * FROM posts
		WHERE post_id = ?
	`;
	const sqlIncludes = `
		SELECT * FROM comments
		WHERE post_id = ?
	`;
	const result = await query(conn, sql, [id]).catch(console.error);
	const resultIncludes = await query(conn, sqlIncludes, [id]).catch(console.error);
	const response = { ...result[0], comments: [ ...resultIncludes ]};

	conn.end();
	return res.send(response);
});

router.get('/', async(req, res) => {
	const params = { ...req.params, ...req.body, ...req.query };
	const conn = await connection().catch(console.error);
	const sql = 
		(params.start && params.end)
			? `SELECT title, post_id AS id, DATE_FORMAT(date, "%Y-%m-%d") as start FROM posts WHERE date BETWEEN '${ params.start }' AND '${ params.end }'`
			: `SELECT *, post_id AS id, DATE_FORMAT(date, "%Y-%m-%d") as start FROM posts`;
	const result = await query(conn, sql).catch(console.error);

	conn.end();
	return res.send(result);
});

router.post('/', async(req, res) => {
	const { title, comment, date, image_url, birth_date, age, place, honors } = { ...req.params, ...req.body, ...req.query };
	const conn = await connection().catch(console.error);
	const sql = `
		INSERT INTO posts
		(title, comment, date, image_url, birth_date, age, place, honors)
		value(?, ?, ?, ?, ?, ?, ?, ?)
	`;
	const result = await query(conn, sql, [ title, comment, date, image_url, birth_date, age, place, honors ]).catch(console.error);

	conn.end();
	return res.send(result);
});

router.post('/with-file', upload.single('image'), async(req, res) => {
	const { filename } = req.file;
	const { title, date, birth_date, age, place, honors } = { ...req.params, ...req.body, ...req.query };
	const image_url = `http://${ req.headers.host }/files/${ filename }`;
	const conn = await connection().catch(console.error);
	const sql = `
		INSERT INTO posts
		(title, date, image_url, birth_date, age, place, honors)
		value(?, ?, ?, ?, ?, ?, ?)
	`;
	const result = await query(conn, sql, [ title, date, image_url, birth_date, age, place, honors ]).catch(console.error);
	console.log(result)
	conn.end();
	return res.redirect(`http://velatoriosgarrido.com/post.html?id=${ result.insertId }`);
	// return res.send(result);
});

module.exports = router;
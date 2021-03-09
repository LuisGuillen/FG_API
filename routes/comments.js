const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const query = require('../db/query');

router.get('/:id', async(req, res) => {
	const { id } = req.params;
	const conn = await connection().catch(console.error);
	const sql = `
		SELECT * FROM comments
		WHERE comment_id = ?
	`;
	const result = await query(conn, sql, [id]).catch(console.error);

	conn.end();
	return res.send(result[0]);
});

router.get('/', async(req, res) => {
	const conn = await connection().catch(console.error);
	const sql = `SELECT * FROM comments`;
	const result = await query(conn, sql).catch(console.error);

	conn.end();
	return res.send(result);
});

router.post('/', async(req, res) => {
	const { post_id, comment, date, image_url, name } = { ...req.params, ...req.body, ...req.query };
	const conn = await connection().catch(console.error);
	const sql = `
		INSERT INTO comments
		(post_id, comment, date, image_url, name)
		value(?, ?, ?, ?, ?)
	`;
	const result = await query(conn, sql, [ post_id, comment, date, image_url, name ]).catch(console.error);

	conn.end();
	return res.send(result);
});

module.exports = router;
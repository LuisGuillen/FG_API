module.exports = async(conn, query, params) => new Promise(
	(res, rej) => {
		const cb = (err, result) => {
			if (err) return rej(err);
			res(result);
		}

		conn.query(query, params, cb);
	}
);
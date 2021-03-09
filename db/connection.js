const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const params = {
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASS || '',
	database: process.env.DB_DATABASE || 'test'
};

module.exports = async() => new Promise(
	(res, rej) => {
		const connection = mysql.createConnection(params);
		connection.connect(err => {
			if (err) return rej(err);
			res(connection);
		});
	}
);
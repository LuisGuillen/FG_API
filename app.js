const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// body parser
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST');
	next();
})

// Console params
app.use((req, res, next) => {
	console.log('params =>', { ...req.params, ...req.body, ...req.query });
	next();
})

// Public files
app.use(express.static('public'));

// Example
const connection = require('./db/connection');
const query = require('./db/query');

app.get('/test', async(req, res) => {
	const conn = await connection().catch(console.error);
	const result = await query(conn, `SELECT 1 + 1 as solution`);
	conn.end();
	return res.json({ result });
})

// Routes
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const filesRouter = require('./routes/files');
const emailRouter = require('./routes/email');

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/files', filesRouter);
app.use('/email', emailRouter);

// Run the server
app.listen(port, () => console.log(`Listen: ${ port }`));
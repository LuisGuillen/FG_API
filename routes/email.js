const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const connect = async() => {
	// For test
	// const testAccount = await nodemailer.createTestAccount();
	// return nodemailer.createTransport({
	// 	host: "smtp.ethereal.email",
	// 	port: 587,
	// 	secure: false,
	// 	auth: {
	// 		user: testAccount.user,
	// 		pass: testAccount.pass,
	// 	},
	// });

	return nodemailer.createTransport({
		host: 'smtp.office365.com',
		port: 587,
		secure: false,
		auth: {
			user: 'test@test.com',
			pass: 'test',
		},
	});
}

router.post('/', async(req, res) => {
	console.log({ ...req.params, ...req.body, ...req.query });
	const transporter = await connect();
	const info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: "test@test.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body  
	});

	return res.json({ status: 'OK' });
});

module.exports = router;
CREATE TABLE posts (
	post_id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR (255), -- Name
	date DATE,
	birth_date DATE,
	age INT,
	place VARCHAR (255),
	honors VARCHAR (255),
	image_url VARCHAR (255)
);

CREATE TABLE comments (
	comment_id INT AUTO_INCREMENT PRIMARY KEY,
	post_id INT,
	name VARCHAR (100),
	comment VARCHAR (255),
	date DATE
);
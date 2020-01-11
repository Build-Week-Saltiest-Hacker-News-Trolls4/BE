# BE

#API documentation

Authentication Endpoints

HTTP method	endpoint	description
POST	/api/auth/register	post object containing username and password to add user to database.
POST	/api/auth/login	post object containing username and password to authenticate existing user.

User Endpoints

GET	/api/user/ returns array of all saved users.
GET	/api/user/:id	Find user by id number.

Comments Endpoints

Get /api/top20 returns array of top 20 saltiest user comments.
POST /api/comment allows user to save favorite comment.

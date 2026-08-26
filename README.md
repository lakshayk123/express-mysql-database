# express-mysql-database
A beginner-friendly CRUD application built with Node.js, Express, MySQL, EJS, and RESTful routing.
# Express MySQL CRUD

A CRUD web application built using Node.js, Express, MySQL and EJS.

## Features

- View all users
- View individual users
- Create a new user
- Edit user information
- Delete users
- MySQL database integration
- RESTful routing
- Method override for PATCH and DELETE requests

## Tech Stack

- Node.js
- Express.js
- MySQL
- EJS
- Faker.js
- method-override

## REST API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | /user | Get all users |
| GET | /user/add | Show add-user form |
| POST | /user | Create a user |
| GET | /user/:id/edit | Show edit form |
| PATCH | /user/:id | Update user |
| GET | /user/:id/del | Show delete confirmation |
| DELETE | /user/:id | Delete user |

## Installation

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Create the MySQL database
5. Start the server

## Environment Variables

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

## Run

npm start

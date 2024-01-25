Doc : https://documenter.getpostman.com/view/27793537/2s9YypDi9K
# Authentication API

## Overview

This API provides endpoints for user authentication and password management, including:

Signup
Email confirmation
Login
Password change
Forget password
Reset password
## Routes

Route	Method	Description
/sign-up	POST	Creates a new user account.
/confirm-email	PATCH	Confirms a user's email address.
/log-in	POST	Authenticates a user and generates tokens.
/change-password	PATCH	Changes a user's password.
/forget-password	POST	Sends a password reset email.
/reset-password	PATCH	Resets a user's password using an OTP.
## Requirements

Node.js (version 14 or later recommended)
MongoDB database
Configured email server for sending confirmation and password reset emails
## Installation

Clone this repository.
Install dependencies: npm install
Create a .env file in the root directory and set the following environment variables:
MONGODB_URI: Connection string to your MongoDB database
CRYPTOKEY: Key for encrypting phone numbers (optional)
MAXOTPSMS: Maximum number of allowed OTP emails per user (optional)
Start the server: npm start
## Usage

Refer to the API documentation or use a tool like Postman to test the endpoints.

## Security Considerations

Passwords are hashed using bcrypt.
Email confirmation is required for new accounts.
Tokens are used for authentication and have expiration times.
Phone numbers are encrypted (if the CRYPTOKEY environment variable is set).
## Additional Notes

The API uses Express.js for routing and middleware.
Error handling is implemented using a custom ErrorClass.
Middleware for validation and authentication is included.
OTP generation and email sending functionality is provided.



Here's the updated README, incorporating details from the additional code:

# User Management API

## Overview

This API provides endpoints for managing user accounts, including:

Retrieving users:
Get all users (admins only)
Get a specific user by ID
Get the logged-in user's profile
Updating profiles:
Update the logged-in user's profile
Deleting users:
Soft delete a user (admins only)
Permanently delete a user from the database (admins only)
## Routes

Route	Method	Description	Access
/	GET	Get all users	Admins only
/profile	GET	Get logged-in user's profile	Users and admins
/:id	GET	Get user by ID	Users and admins
/update	PUT	Update logged-in user's profile	Users and admins
/delete	PATCH	Soft delete user	Admins only
/:id	DELETE	Permanently delete user	Admins only
## Requirements

Same as Authentication API
## Security Considerations

Same as Authentication API
## Additional Notes

Encryption of phone numbers is optional using a CryptoJS key.
Soft deletion marks a user as deleted without removing them from the database.
Permanent deletion removes the user from the database.


# Posts API

## Overview

This API provides endpoints for managing posts, including:

Retrieving posts:
Get all posts
Get a specific post by ID
Creating posts:
Create a new post (authenticated users only)
Updating posts:
Update an existing post (owners only)
Deleting posts:
Delete a post (owners only)
## Routes

Route	Method	Description	Access
/	GET	Get all posts	Public
/	POST	Create a new post	Users and admins
/:id	GET	Get post by ID	Public
/:id	PUT	Update post	Post owners only
/:id	DELETE	Delete post	Post owners only
## Additional Notes

Posts are associated with their creators using a createdBy field.
Only post owners can update or delete their posts.

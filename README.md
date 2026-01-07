# Backend – Judix Full Stack Assignment

This is the backend service for the Judix Full Stack Developer Intern assignment.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt for password hashing

## Features
- User registration and login with JWT
- Secure password hashing
- Auth-protected routes
- User profile endpoint
- CRUD operations for tasks
- Search and filter support
- Centralized error handling

## Project Structure
src/
├─ controllers/
├─ routes/
├─ models/
├─ middlewares/
├─ config/
├─ app.js
└─ server.js


## Environment Variables
Create a `.env` file:


PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Running Locally

npm install
npm run dev
API Overview
POST /auth/register

POST /auth/login

GET /users/me

CRUD /tasks

All protected routes require a valid JWT token.

Security
Passwords are hashed using bcrypt

JWT-based authentication with expiration

Authorization middleware protects sensitive routes

Scalability Considerations
Modular project structure

Stateless authentication

Ready for horizontal scaling

Can be extended with Redis, rate limiting, and API versioning

Deployment
Deployed using Render (free tier) with MongoDB Atlas.

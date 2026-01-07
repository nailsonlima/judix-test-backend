# Deployment Guide

This backend is ready for deployment on platforms like Render or Railway.

## Environment Variables

The following environment variables are required in production:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port to run the server on (automatically set by most platforms) | `3000` |
| `NODE_ENV` | Environment mode | `production` |
| `MONGO_URI` | MongoDB Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key` |
| `CORS_ORIGIN` | Allowed frontend origin | `https://your-frontend-app.com` |

## Deployment on Render

1.  **Create a Web Service**: Connect your GitHub repository.
2.  **Build Command**: `npm install`
3.  **Start Command**: `npm start`
4.  **Environment Variables**: Add the variables listed above.
    *   For `MONGO_URI`, ensure you have a database provisioned (e.g., MongoDB Atlas or Render's PostgreSQL if you were using SQL, but this is Mongoose, so Atlas is recommended).

## Deployment on Railway

1.  **New Project**: Deploy from GitHub repo.
2.  **Variables**: Go to various settings and add the environment variables.
3.  **Database**: You can add a MongoDB plugin within Railway or use an external URL (Atlas). If using Railway's MongoDB, it will provide a `MONGO_URL` variable automatically.

## Local Production Test

To test the production build locally:

```bash
# Set environment to production
$env:NODE_ENV="production" 
# (Or on Mac/Linux: check your shell syntax, e.g. export NODE_ENV=production)

# Start server
npm start
```

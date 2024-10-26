import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectionDB } from './config/db.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const allowedOrigins = [
 'http://localhost:3000',
 'https://farm-app-frontend.vercel.app',
 'https://farm-app-lime.vercel.app',
 'https://farm-1cpj66w15-nurlan-bakenbaevs-projects.vercel.app',
 'https://farm-app-git-main-nurlan-bakenbaevs-projects.vercel.app'
];

app.use(
 cors({
  origin: function (origin, callback) {
   if (!origin) return callback(null, true);

   if (allowedOrigins.indexOf(origin) === -1) {
    return callback(new Error('Not allowed by CORS'));
   }
   return callback(null, true);
  },
  credentials: true
 })
);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user', userRouter);
app.use('/api', productRouter);

// Connect to MongoDB and start the server
connectionDB(process.env.MONGO_DB_URL)
 .then(() => {
  app.listen(process.env.PORT, () => {
   console.log(`Server is running on ${process.env.PORT}`);
  });
 })
 .catch((err) => {
  console.error('Database connection failed:', err);
 });

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { config } from './config/server.config.js';
import connectToDB from './config/db.config.js';
import apiRouter from './routes/index.js';
import errorHandler from './utils/errorHandler.js';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: config.BASE_URL, // from where I want my request to come to backend
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'], // which methods to allow
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 3600,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.COOKIE_SECRET));


app.get('/ping', (req, res) => {
  res.status(200).json({
    msg: 'Server is working',
  });
});

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(config.PORT, async (req, res) => {
  console.log(`Server is listening at PORT `, config.PORT);
  await connectToDB();
});

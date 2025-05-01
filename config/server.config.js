import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT ?? 4000,
  MONGODB_ATLAS: process.env.MONGODB_ATLAS,
  BASE_URL: process.env.BASE_URL || 'localhost:3000',
  SALT_ROUND: process.env.SALT_ROUND || 10,

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_SENDER: process.env.SMTP_SENDER,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,

  COOKIE_SECRET: process.env.COOKIE_SECRET
};


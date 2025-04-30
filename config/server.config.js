import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT ?? 4000,
  MONGODB_ATLAS: process.env.MONGODB_ATLAS,
  BASE_URL: process.env.BASE_URL,
  SALT_ROUND: process.env.SALT_ROUND,

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_SENDER: process.env.SMTP_SENDER,
};

import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT ?? 4000,
  MONGODB_ATLAS: process.env.MONGODB_ATLAS,
  BASE_URL: process.env.BASE_URL,
};

import mongoose from 'mongoose';
import { config } from './server.config.js';

async function connectToDB() {
  try {
    await mongoose.connect(config.MONGODB_ATLAS);
    console.log('Connected to DB');
  } catch (err) {
    console.log('Error in connecting mongoose', err);
    process.exit(1);
  }
}

export default connectToDB;

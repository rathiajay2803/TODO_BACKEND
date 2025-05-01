import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import { config } from '../config/server.config.js';

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      min: [4, 'Too short'],
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationExpiry: {
      type: Date,
    },
  },
  {
    timestamp: true,
    strict: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.validatePassword = async function(password){
  return await bcrypt.compare(password, this.password);

}

UserSchema.methods.generatejwtToken = async (payload)=>{
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRY,
    algorithm: "HS256"
  })
}

const User = mongoose.model('User', UserSchema);
export default User;

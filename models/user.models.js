import mongoose from 'mongoose';

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
    stric: true,
  }
);

const User = mongoose.model('User', UserSchema);
export default User;

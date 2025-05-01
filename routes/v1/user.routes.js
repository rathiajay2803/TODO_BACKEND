import express from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  login,
  registerUser,
  verifyUser,
} from '../../controllers/users.controller.js';
import { validateUser } from '../../validators/user.validator.js';

const userRouter = express.Router();

userRouter.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Users router is working',
  });
});

userRouter.post('/register', validateUser, registerUser);
userRouter.get('/verify/:token', verifyUser);
userRouter.post('/login', login);

export default userRouter;

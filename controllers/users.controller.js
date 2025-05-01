import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import User from '../models/user.models.js';
import BadRequest from '../errors/badRequest.js';
import InternalServerError from '../errors/internalServerError.js';
import { config } from '../config/server.config.js';
import sendmail from '../utils/sendmail.js';

const registerUser = async (req, res, next) => {
  //get data
  //validate
  //check if user is already exists
  // if no, add the user details in db
  // get the veriifcation token and store it in db and send it to user also

  try {
    let { name, email, password } = req.body;

    //check if user is already exists
    const isUserExist = await User.findOne({ email }).select('-password');
    if (isUserExist) {
      throw new BadRequest('email', {
        propertyName: 'User',
        msg: `user with email ${email} already exists`,
      });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpiry = Date.now() + 1000 * 60 * 10;

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationExpiry,
    });

    const userinfo = {
      name,
      email,
    };

    const verificationLink = `${config.BASE_URL}/api/v1/users/verify/${verificationToken}`;

    const mailData = await sendmail(userinfo, verificationLink);

    res.status(StatusCodes.CREATED).json({
      success: true,
      msg: 'User is registered successfully',
      data: mailData,
      err: {},
    });
  } catch (err) {
    console.log('Error while registering the user', err);
    next(err);
  }
};

const verifyUser = async (req, res, next) => {
  //get token

  try {
    const { token } = req.params;

    if (!token) {
      throw new BadRequest('Invalid Token', {
        propertyName: 'token',
        msg: 'Verification token is not present in request params',
      });
    }

    const user = await User.findOne({ verificationToken: token }).select(
      '-password'
    );
    if (!user) {
      throw new BadRequest(`Invalid Token`, {
        propertyName: 'token',
        msg: `No user found for token id ${token}`,
      });
    }

    if (Date.now() < user.verificationExpiry) {
      user.isVerified = true;
      user.verificationToken = null;
      user.verificationExpiry = null;
      await user.save();
    } else {
      throw new BadRequest(`Invalid Token`, {
        propertyName: 'token',
        msg: `Token is validated after the token expiry - ${token}`,
      });
    }

    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      msg: 'User is verified',
      data: {
        id: user._id,
        role: user.role,
      },
      err: {},
    });
  } catch (err) {
    console.log('Unable to verify the user', err);
    next(err);
  }
};

const login = async (req, res, next) => {
  //get data
  //validate data
  //get user from db

  let { email, password } = req.body;

  try {
    

    if (!email || !password) {
      throw new BadRequest('Invalid Credentials', {
        propertyName: { email, password },
        msg: 'Either email or password is incorrect',
      });
    }

    const user = await User.findOne({ email });
    
    const isPasswordCorrect = await user.validatePassword(password); 

    if (!user || !isPasswordCorrect) {
      throw new BadRequest(`Invalid Credentials`, {
        propertyName: 'email',
        msg: `No user found for email- ${email}`,
      });
    }

    const userPayload = {
      id: user._id,
      email: user.email,
      role: user.role
    }
    const token = await user.generatejwtToken(userPayload);
   
    const cookieOptions = {
     
      httpOnly: true,
      maxAge: 24*60*60*1000,
      secure: true, 
      signed: true,
      sameSite: 'lex' //default lex- allows top level navifation for cross SameSite(not same origin)
    }
    res.cookie("token", token, cookieOptions )

    res.status(StatusCodes.OK).json({
      success: true,
      msg: 'User is login successfully',
      data: userPayload,
      
    })
    } catch (error) {
      console.log(error);
      next(error);
    }

};

export { registerUser, verifyUser, login };

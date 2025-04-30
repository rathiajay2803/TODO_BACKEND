import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';

import User from '../models/user.models.js';
import BadRequest from '../errors/badRequest.js';
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

    const verificationLink = `${config.BASE_URL}/ap1/v1/users/verify/${verificationToken}`;

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

export { registerUser };

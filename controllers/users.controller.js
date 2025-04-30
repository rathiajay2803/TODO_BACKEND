import { StatusCodes } from 'http-status-codes';

const registerUser = async (req, res) => {
  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'User is registered',
  });
};

export { registerUser };

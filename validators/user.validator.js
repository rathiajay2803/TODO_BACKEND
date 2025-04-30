import BadRequest from '../errors/badRequest.js';

const validateUser = (req, res, next) => {
  let { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new BadRequest('Invalid Credentials', {
        propertyName: { name, email, password },
        msg: 'No value for one of the mentioned property',
      });
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      throw new BadRequest('email', {
        propertyName: { email },
        msg: 'Incorrect email id.',
      });
    }
    return next();
  } catch (error) {
    console.log('User Validation Failed');
    next(error);
  }
};

export { validateUser };

import { VALIDATIONS } from '../utils/constant.js';
import {
  findUserByEmailOrUsername,
  loginUser,
  registerUser,
} from '../services/auth.js';
import { errorHandler } from '../utils/errorHandler.js';

export const signup = async (req, res, next) => {
  if (!req.body) {
    return next(errorHandler(400, 'Body data is missing'));
  }
  const { username, email, password, confirmPassword } = req.body;
  // valid the user data is empty or not
  if (!username || !email || !password || !confirmPassword) {
    return next(errorHandler(400, 'User data is missing'));
  }

  const isEveryUserDataString = [
    username,
    email,
    password,
    confirmPassword,
  ].every((userData) => typeof userData === 'string');

  if (!isEveryUserDataString) {
    return next(errorHandler(400, 'User data is not correct type'));
  }

  if (!VALIDATIONS.USER_NAME(username)) {
    return next(
      errorHandler(
        400,
        'Please enter a valid username. starts with letter/underscore, only letters/numbers/underscore, min 6 chars'
      )
    );
  }

  // verify that password and confirmPassword are same or not
  if (password != confirmPassword) {
    return next(
      errorHandler(400, 'Password and Confirm Password are not matching')
    );
  }

  // verify that email is valid or not
  if (!VALIDATIONS.EMAIL(email)) {
    return next(errorHandler(400, 'Please enter a valid email'));
  }

  if (!VALIDATIONS.PASSWORD(password)) {
    return next(
      errorHandler(
        400,
        'Please enter a valid Password. minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char'
      )
    );
  }

  const isUserAlreadyExist = await findUserByEmailOrUsername(email, username);

  if (isUserAlreadyExist) {
    return next(
      errorHandler(
        400,
        isUserAlreadyExist.email === email
          ? 'This email is already registered'
          : 'This username is already taken'
      )
    );
  }

  try {
    await registerUser(username, email, password);
    return res.status(201).json({
      success: true,
      message: 'User registered successful',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  if (!req.body) {
    return next(errorHandler(400, 'Body data is missing'));
  }
  const { email, password } = req.body;

  // valid the user data is empty or not
  if (!email || !password) {
    return next(errorHandler(400, 'User data is missing'));
  }

  const isEveryUserDataString = [email, password].every(
    (userData) => typeof userData === 'string'
  );

  if (!isEveryUserDataString) {
    return next(errorHandler(400, 'User data is not correct type'));
  }

  if (!VALIDATIONS.EMAIL(email)) {
    return next(errorHandler(400, 'Please enter a valid email'));
  }

  try {
    const loginData = await loginUser(email, password);
    if (!loginData) {
      return next(errorHandler(400, 'Invalid email or Password'));
    }

    const { user, token } = loginData;
    user.password = undefined;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'User login successful',
      user,
    });
  } catch (error) {
    next(error);
  }
};

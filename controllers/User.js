import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import User from '../models/User.js';
import { USER, VALIDATIONS } from '../utils/constant.js';

export const register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Body data is missing',
    });
  }
  const { username, email, password, confirmPassword } = req.body;
  // valid the user data is empty or not
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'User data is missing',
    });
  }

  const isEveryUserDataString = [
    username,
    email,
    password,
    confirmPassword,
  ].every((userData) => typeof userData === 'string');

  if (!isEveryUserDataString) {
    return res.status(400).json({
      success: false,
      message: 'User data is not correct type',
    });
  }

  if (!VALIDATIONS.USER_NAME(username)) {
    return res.status(403).json({
      success: false,
      message: 'Please enter a valid username',
      usernameGuide:
        'starts with letter/underscore, only letters/numbers/underscore, min 6 chars',
    });
  }

  // verify that password and confirmPassword are same or not
  if (password != confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Password and Confirm Password are not matching',
    });
  }

  // verify that email is valid or not
  if (!VALIDATIONS.EMAIL(email)) {
    return res.status(403).json({
      success: false,
      message: 'Please enter a valid email',
    });
  }

  if (!VALIDATIONS.PASSWORD(password)) {
    return res.status(403).json({
      success: false,
      message: 'Please enter a valid Password',
      passwordGuide:
        ' minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char ',
    });
  }

  const isUserAlreadyExist = await User.findOne({
    where: {
      [Op.or]: [{ [USER.EMAIL]: email }, { [USER.USERNAME]: username }],
    },
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      success: false,
      message:
        isUserAlreadyExist[USER.EMAIL] === email
          ? 'This email is already registered'
          : 'This username is already taken',
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userObj = {
      [USER.USERNAME]: username,
      [USER.EMAIL]: email,
      [USER.PASSWORD]: hashedPassword,
    };
    await User.create(userObj);
    return res.status(201).json({
      success: true,
      message: 'User registration successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'User registration unsuccessful',
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // valid the user data is empty or not
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'User data is missing',
    });
  }
  if (!VALIDATIONS.EMAIL(email)) {
    return res.status(403).json({
      success: false,
      message: 'Please enter a valid email',
    });
  }
};

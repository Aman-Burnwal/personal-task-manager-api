import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/User.js';
import { USER } from '../utils/constant.js';

export const registerUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({
    [USER.USERNAME]: username,
    [USER.EMAIL]: email,
    [USER.PASSWORD]: hashedPassword,
  });
};

export const findUserByEmailOrUsername = async (email, username) => {
  return await User.findOne({
    where: {
      [Op.or]: [{ [USER.EMAIL]: email }, { [USER.USERNAME]: username }],
    },
  });
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { [USER.EMAIL]: email } });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return false;

  const payload = { id: user[USER.ID] };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  return { user, token };
};

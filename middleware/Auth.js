import jwt from 'jsonwebtoken';
import Task from '../models/Task.js';
import { TASK } from '../utils/constant.js';

export const isUserAuthorized = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Task id is missing',
    });
  }
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(400).json({
        success: false,
        message: `There is no class that belongs to this id: %{id}`,
      });
    }

    if (task[TASK.USER_ID] != userId) {
      return res.status(401).json({
        success: false,
        message: 'Task doesn\'t belongs to the user'
      })
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
 
};

export const isValidUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'User is not login',
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'User is not authentic.',
    });
  }
};

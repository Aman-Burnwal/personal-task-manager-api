import jwt from 'jsonwebtoken';
import Task from '../models/Task.js';
import { TASK } from '../utils/constant.js';
import { errorResponse } from '../utils/errorHandler.js';

export const isUserAuthorized = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  if (!id) return next(errorResponse(400, 'Task id is missing'));

  try {
    const task = await Task.findByPk(id);
    if (!task) return next(errorResponse(404, `No task found with id: ${id}`));

    if (task[TASK.USER_ID] != userId) {
      return next(errorResponse(403, "Task doesn't belong to this user"));
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const isValidUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(errorHandler(401, 'User is not logged in'));

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return next(errorHandler(401, 'User is not authentic'));
  }
};

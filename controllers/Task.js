import {
  createTaskService,
  deleteTaskService,
  getSingleTaskService,
  getUserTasksService,
  updateTaskService,
} from '../services/tasks.js';
import { TASK } from '../utils/constant.js';
import { errorHandler } from '../utils/errorHandler.js';

export const createTask = async (req, res, next) => {
  if (!req.body) {
    return next(errorHandler(400, 'Body data is missing'));
  }
  const { title, description, priority, dueDate, status } = req.body;
  const { id } = req.user;
  // valid the Task data is empty or not
  if (!title || !description || !priority || !dueDate || !status || !id) {
    return next(errorHandler(400, 'Task data is missing'));
  }

  const isEveryUserDataString = [title, description, priority, status].every(
    (userData) => typeof userData === 'string'
  );
  const parsedDueDate = new Date(dueDate);

  if (!isEveryUserDataString || isNaN(parsedDueDate.getTime())) {
    return next(errorHandler(400, 'Task data is not correct type'));
  }

  try {
    const newTaskObj = {
      [TASK.TITLE]: title,
      [TASK.DESCRIPTION]: description,
      [TASK.PRIORITY]: priority,
      [TASK.DUE_DATE]: dueDate,
      [TASK.STATUS]: status,
      [TASK.USER_ID]: id,
    };
    const newTask = await createTaskService(newTaskObj);

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  const { id } = req.user;
  if (!id) {
    return next(errorHandler(401, 'User Id is missing'));
  }

  try {
    const userTasks = await getUserTasksService(id, req.query);
    return res.status(200).json({
      success: true,
      message: 'User tasks fetched successfully',
      tasks: userTasks,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchSingleTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await getSingleTaskService(id);
    return res.status(200).json({
      success: true,
      message: 'Task found successful',
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  if (!req.body) {
    return next(errorHandler(400, 'Body data is missing'));
  }
  const { title, description, priority, dueDate, status } = req.body;
  // valid the user data is empty or not
  if (!title || !description || !priority || !dueDate || !status || !id) {
    return next(errorHandler(400, 'Task data is missing'));
  }

  const isEveryUserDataString = [title, description, priority, status].every(
    (userData) => typeof userData === 'string'
  );

  const parsedDueDate = new Date(dueDate);
  if (!isEveryUserDataString || isNaN(parsedDueDate.getTime())) {
    return next(errorHandler(400, 'Task data is not correct type'));
  }

  try {
    const updatedTaskObj = {
      [TASK.TITLE]: title,
      [TASK.DESCRIPTION]: description,
      [TASK.PRIORITY]: priority,
      [TASK.DUE_DATE]: dueDate,
      [TASK.STATUS]: status,
      [TASK.USER_ID]: userId,
    };
    await updateTaskService(id, updatedTaskObj);
    return res.status(201).json({
      success: true,
      message: 'Task updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteTaskService(id);
    return res.status(200).json({
      success: true,
      message: 'Task deleted successful',
    });
  } catch (error) {
    next(error);
  }
};

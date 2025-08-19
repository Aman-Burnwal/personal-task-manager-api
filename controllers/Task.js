import Task from '../models/Task.js';
import { TASK } from '../utils/constant.js';

export const createTask = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Body data is missing',
    });
  }
  const { title, description, priority, dueDate, status } = req.body;
  const { id } = req.user;
  // valid the user data is empty or not
  if (!title || !description || !priority || !dueDate || !status || !id) {
    return res.status(400).json({
      success: false,
      message: 'User data is missing',
    });
  }

  const isEveryUserDataString = [title, description, priority, status].every(
    (userData) => typeof userData === 'string'
  );

  if (!isEveryUserDataString || !dueDate instanceof Date) {
    return res.status(400).json({
      success: false,
      message: 'User data is not correct type',
    });
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
    const newTask = await Task.create(newTaskObj);
    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in task creation',
      error: error.message,
    });
  }
};

import Task from '../models/Task.js';
import { TASK } from '../utils/constant.js';

export const createTaskService = async (taskData) => {
  return await Task.create(taskData);
};

export const getUserTasksService = async (userId) => {
  return await Task.findAll({
    where: { [TASK.USER_ID]: userId },
  });
};

export const getSingleTaskService = async (taskId) => {
  return await Task.findByPk(taskId);
};

export const updateTaskService = async (taskId, taskData) => {
  return await Task.update(taskData, {
    where: { [TASK.ID]: taskId },
  });
};

export const deleteTaskService = async (taskId) => {
  return await Task.destroy({
    where: { [TASK.ID]: taskId },
  });
};

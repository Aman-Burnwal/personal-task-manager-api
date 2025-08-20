import Task from '../models/Task.js';
import {TASK} from '../utils/constant.js';

export const createTaskService = async (taskData) => {
  return await Task.create(taskData);
};

export const getUserTasksService = async (userId, filters = {}) => {
  const {priority, status, from, to, sortBy, order} = filters;

  const whereClause = {[TASK.USER_ID]: userId};

  if (priority) {
    whereClause[TASK.PRIORITY] = priority;
  }

  if (status) {
    whereClause[TASK.STATUS] = status;
  }

  if (from && to) {
    whereClause[TASK.DUE_DATE] = {$between: [from, to]};
  } else if (from) {
    whereClause[TASK.DUE_DATE] = {$gte: from};
  } else if (to) {
    whereClause[TASK.DUE_DATE] = {$lte: to};
  }

  const orderClause = [];
  if (sortBy) {
    orderClause.push([
      sortBy,
      order && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC',
    ]);
  }

  return await Task.findAll({
    where: whereClause,
    order: orderClause,
  });
};

export const getSingleTaskService = async (taskId) => {
  return await Task.findByPk(taskId);
};

export const updateTaskService = async (taskId, taskData) => {
  return await Task.update(taskData, {
    where: {[TASK.ID]: taskId},
  });
};

export const deleteTaskService = async (taskId) => {
  return await Task.destroy({
    where: {[TASK.ID]: taskId},
  });
};

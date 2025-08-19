import { Router } from 'express';
import { createTask, fetchSingleTask, getAllTasks } from '../controllers/Task.js';
import { isUserAuthorized, isValidUser } from '../middleware/Auth.js';

const router = Router();
router.post('/', isValidUser, createTask);
router.get('/', isValidUser, getAllTasks);
router.get('/:id', isValidUser, isUserAuthorized, fetchSingleTask);

export default router;

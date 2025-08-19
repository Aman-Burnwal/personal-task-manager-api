import { Router } from 'express';
import { createTask, getAllTasks } from '../controllers/Task.js';
import { isUserAuthorized, isValidUser } from '../middleware/Auth.js';

const router = Router();
router.post('/', isValidUser, createTask);
router.get('/',isValidUser, getAllTasks);

export default router;

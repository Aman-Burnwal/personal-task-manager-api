import { Router } from 'express';
import { createTask } from '../controllers/Task.js';
import { isUserAuthorized, isValidUser } from '../middleware/Auth.js';

const router = Router();
router.post('/', isValidUser, createTask);

export default router;

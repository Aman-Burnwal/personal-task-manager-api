import {Router} from 'express';
import { signup, login } from '../controllers/User.js';
const router = Router();


router.post('/auth/register', signup);
router.post('/auth/login', login);

export default router;
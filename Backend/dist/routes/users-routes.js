import express from 'express';
// @ts-ignore
import { signup, login, getUsers } from '../controllers/users-controllers.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/', auth, getUsers);
export default router;
//# sourceMappingURL=users-routes.js.map
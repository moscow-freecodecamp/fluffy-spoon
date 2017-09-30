import { Router } from 'express';
import * as UsersController from '../controllers/users.controller';

const router = new Router();

router.get('/', UsersController.listUsers);

export default router;

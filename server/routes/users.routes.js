import { Router } from 'express';
import { validator as validatorMiddleware } from '../middleware';
import { createUser as createUserValidator } from '../validators';
import * as UsersController from '../controllers/users.controller';

const router = new Router();

router.get('/', UsersController.listUsers);
router.post(
  '/',
  validatorMiddleware(createUserValidator),
  UsersController.createUser
);

export default router;

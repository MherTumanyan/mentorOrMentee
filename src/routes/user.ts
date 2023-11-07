import express from 'express';
import { UserController } from '../controllers/user';
import { authenticate } from '../middleware/authenticate';

export function initalizeUserRoute(userController: UserController) {
  const router = express.Router();
  router.get('/getUsers', authenticate, userController.getUsers);
  router.get('/profile', authenticate, userController.getProfile);
  router.put('/profile', authenticate, userController.updateProfile);
  return router;
}

import express from 'express';
import { AuthController } from './../controllers/auth';

export function initalizeAuthRoute(authController: AuthController) {
  const router = express.Router();
  router.post('/register', authController.register);
  router.post('/login', authController.login);
  return router;
}

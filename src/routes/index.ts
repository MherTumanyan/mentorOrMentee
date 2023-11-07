import express from 'express';
import { initializeControllers } from '../controllers/index';
import { initalizeAuthRoute } from './auth';
import { initalizeUserRoute } from './user';
import { AuthService } from '../services/auth';
import { UserService } from '../services/user';

export const initalizeRoutes = (
  userService: UserService,
  authService: AuthService,
) => {
  const { UserController, AuthController } = initializeControllers(
    userService,
    authService,
  );
  const router = express.Router();
  router.use(initalizeAuthRoute(AuthController));
  router.use(initalizeUserRoute(UserController));
  router.use((req: any, res: any, next: any, err: any) => {
    res.status(err.status || 500).json({ message: err.message });
  });
  return router;
};

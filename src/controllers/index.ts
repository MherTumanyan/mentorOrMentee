import { AuthService } from '../services/auth';
import { UserService } from '../services/user';
import { AuthController } from './auth';
import { UserController } from './user';

export const initializeControllers = (
  userService: UserService,
  authService: AuthService,
) => {
  const userController = new UserController(userService);
  const authController = new AuthController(authService);

  return {
    UserController: userController,
    AuthController: authController,
  };
};

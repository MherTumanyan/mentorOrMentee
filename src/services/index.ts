import { UserModel } from '../db/models/User';
import { AuthService } from './auth';
import { UserService } from './user';

export const initalize = (userModel: typeof UserModel) => {
  const userService = new UserService(userModel);
  const authService = new AuthService(userService);
  return {
    userService,
    authService,
  };
};

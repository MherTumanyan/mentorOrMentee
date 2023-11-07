import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.getUsers = this.getUsers.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.listUsers(req.query);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getUserProfile(req.body.userId);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, ...updatedProfileData } = req.body;
      const users = await this.userService.editProfile(
        userId,
        updatedProfileData,
      );

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

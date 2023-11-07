import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth';

export class AuthController {
  private AuthService: AuthService;

  constructor(AuthService: AuthService) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.AuthService = AuthService;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.AuthService.register(req.body);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

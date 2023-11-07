import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from './db/models/User';

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

export const doesUserExist = async (email: string): Promise<boolean> => {
  const existingUser = await UserModel.findOne({ where: { email } });
  return existingUser !== null;
};

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const createUser = async (userData: any): Promise<UserModel> => {
  return UserModel.create(userData);
};

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, String(process.env.JWT_SECRET));
};

export const verifyPassword = async (
  enteredPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(enteredPassword, hashedPassword);
};

export class HttpErrors extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

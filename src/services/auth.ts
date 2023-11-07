import { UserModel } from '../db/models/User';
import {
  HttpErrors,
  createUser,
  doesUserExist,
  generateToken,
  hashPassword,
  isEmailValid,
  verifyPassword,
} from '../helper';
import { loginSchema, registrationSchema } from './schemas';
import { RegistrationData } from './types';
import { UserService } from './user';

export class AuthService {
  private userService: UserService;

  constructor(UserService: UserService) {
    this.userService = UserService;
  }

  async register(data: RegistrationData) {
    const { error, value } = registrationSchema.validate(data);
    if (error) {
      throw new HttpErrors(400, error.details[0].message);
    }

    const {
      name,
      surname,
      email,
      password,
      type,
      position,
      field,
      shortDescription,
      education,
      experience,
      about,
    } = data;

    if (!isEmailValid(email)) {
      throw new HttpErrors(400, 'Invalid email format.');
    }

    if (await doesUserExist(email)) {
      throw new HttpErrors(400, 'User with this email already exists.');
    }

    const hashedPassword = await hashPassword(password);

    const userData = {
      name,
      surname,
      email,
      password: hashedPassword,
      type,
      position,
      field,
      shortDescription,
      education,
      experience,
      about,
    };

    const newUser = await createUser(userData);
    const token = generateToken(newUser.get('id'));

    return { newUser, token };
  }

  async login(email: string, password: string) {
    const { error } = loginSchema.validate({ email, password });
    if (error) {
      throw new HttpErrors(400, error.details[0].message);
    }
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw new HttpErrors(401, `There is no user with this email: ${email}`);
    }

    const passwordMatch = await verifyPassword(password, user.get('password'));

    if (!passwordMatch) {
      throw new HttpErrors(401, 'Invalid password');
    }

    const token = generateToken(user.get('id'));
    return { token };
  }
}

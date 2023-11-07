import { Op } from 'sequelize';
import { listUsersArgsSchema } from './schemas';
import { UserModel } from '../db/models/User';
import { ListUsersArgs, UpdatedProfileData } from './types';
import { HttpErrors, hashPassword } from '../helper';

export class UserService {
  private UserModel;

  constructor(UserModel: any) {
    this.UserModel = UserModel;
  }

  getUser = async (userId: number) => {
    const user = await this.UserModel.findOne({ where: { id: userId } });
    return user;
  };

  async editProfile(userId: number, updatedProfileData: any) {
    const user = await this.UserModel.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpErrors(404, 'User not found');
    }

    const updatableFields = [
      'name',
      'surname',
      'type',
      'position',
      'field',
      'shortDescription',
      'email',
      'education',
      'experience',
      'about',
    ];

    for (const field of updatableFields) {
      if (
        updatedProfileData[field] !== undefined &&
        updatedProfileData[field] !== null
      ) {
        if (field === 'password' && updatedProfileData[field]) {
          const hashedPassword = await hashPassword(updatedProfileData[field]);
          user[field] = hashedPassword;
        } else {
          user[field] = updatedProfileData[field];
        }
      }
    }

    await user.save();

    return user;
  }

  getUserProfile = async (userId: number) => {
    const user = await this.UserModel.findOne({ where: { id: userId } });
    return user;
  };

  listUsers = async (filters: ListUsersArgs): Promise<UserModel[]> => {
    const { error, value } = listUsersArgsSchema.validate(filters);
    if (error) {
      throw new HttpErrors(400, error.details[0].message);
    }

    const query: any = { where: {} };

    const filterMappings: { [key: string]: string } = {
      name: 'name',
      surname: 'surname',
      userType: 'userType',
      registrationDateFrom: 'registrationDate',
      registrationDateTo: 'registrationDate',
    };

    Object.entries(value).forEach(([filter, filterValue]) => {
      if (
        filter === 'registrationDateFrom' ||
        filter === 'registrationDateTo'
      ) {
        if (filterValue) {
          const dateKey = filter === 'registrationDateFrom' ? 'gte' : 'lte';
          query.where[filterMappings[filter]] = { [Op[dateKey]]: filterValue };
        }
      } else if (filterMappings[filter] && filterValue) {
        query.where[filterMappings[filter]] = filterValue;
      }
    });

    const users: UserModel[] = await this.UserModel.findAll(query);
    return users;
  };
}

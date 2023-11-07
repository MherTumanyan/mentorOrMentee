import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../orm/config';

const userTypes = ['mentor', 'mentee'];
const fieldValues = ['Developer', 'DevOps', 'QA'];

class UserModel extends Model {
  public id!: number;
  public name!: string;
  public surname!: string;
  public type!: 'mentor' | 'mentee';
  public position!: string;
  public password!: string;
  public field!: 'Developer' | 'DevOps' | 'QA';
  public shortDescription!: string;
  public email!: string;
  public education!: string;
  public experience!: string;
  public about!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserModel.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM(...userTypes),
    },
    position: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    field: {
      type: DataTypes.ENUM(...fieldValues),
    },
    shortDescription: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    education: {
      type: DataTypes.STRING,
    },
    experience: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  },
);

export { UserModel };

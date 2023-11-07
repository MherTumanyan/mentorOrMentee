import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  database: String(process.env.DB_NAME),
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
});

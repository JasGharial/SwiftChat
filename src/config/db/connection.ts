import { Sequelize } from "sequelize";
import * as configModule from "./config.cjs";

const env = process.env.NODE_ENV || "development";
const config = configModule[env as keyof typeof configModule];

const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  dialect: 'postgres',
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch((err: any) => {
  console.log('Error syncing database', err);
});

export default sequelize;

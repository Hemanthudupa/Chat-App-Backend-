import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";
export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "postgres",
  host: "localhost",
  password: process.env.DB_PASS,
  pool: {
    max: 6,
    min: 0,
    idle: 5000,
  },
  username: process.env.DB_USER,
  port: process.env.DB_PORT,
  logging: false,
} as any);
export async function createConnection() {
  await sequelize.authenticate();
  console.log(" successfully connected to data base");
  return "hello";
}

const umzug = new Umzug({
  migrations: {
    glob: "./migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize,
  logger: undefined,
});

export async function runAllMigrations() {
  try {
    await umzug.up();
    return " all the migrations are loaded ";
  } catch (error) {}
}

import { Sequelize } from "sequelize";
export const sequelize = new Sequelize({
  database: "chat-app",
  dialect: "postgres",
  host: "localhost",
  password: "root",
  pool: {
    max: 6,
    min: 0,
    idle: 5000,
  },
  username: "postgres",
  port: 5433,
});
export async function createConnection() {
  await sequelize.authenticate();
  console.log(" successfully connected to data base");
  return "hello"
}

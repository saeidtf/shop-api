import { Sequelize } from "sequelize-typescript";
import { Address, Category, City, Color, Contact, Province, Role, User } from "../../models";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./app.db",
  logging: false,
  models: [User , Role , Address , Province,City , Category , Color , Contact],
});

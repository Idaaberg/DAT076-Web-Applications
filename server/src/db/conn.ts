import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

export let conn : Sequelize;

dotenv.config();

if (process.env.NODE_ENV === "test") {
  conn = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',  
  });
  console.log("Using in-memory database");
} else {
  conn = new Sequelize(`postgres://app_db_user:${process.env.DB_PASSWORD}@localhost:54321`);
}

export async function initDB() {
    await conn.sync({alter: true, force: false});
  }
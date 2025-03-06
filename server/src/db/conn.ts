import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

export let conn : Sequelize;

dotenv.config();

conn = new Sequelize(`postgres://app_db_user:${process.env.DB_PASSWORD}@localhost:54321`);

export async function initDB() {
    await conn.sync({alter: true, force: false});
  }
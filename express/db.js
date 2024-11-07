import {Sequelize} from "sequelize"
import pkg from "pg"
const { Pool } = pkg;
export const sequelize = new Sequelize("eduVault", "postgres", "qwerty", {
    dialect : "postgres",
    host : "localhost",
    post : "5432"
});

export const pool = new Pool({
    user : "postgres",
    host : "localhost",
    post : 5432,
    database : "eduVault",
    password : "qwerty"
})
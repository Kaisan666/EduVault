import { json, QueryTypes } from "sequelize";
import { sequelize } from "../db.js";
import bcrypt from "bcrypt"
// const jwt = require("jsonwebtoken")
import jwt from 'jsonwebtoken';
const generateJWT = (id, login, roleId) => {
    return jwt.sign({id, login, roleId},
        process.env.SECRET_KEY,
        {expiresIn : "24h"})
}
class UserController {
    async registration(req, res) {
        
    }
    async login(req, res) {
        const {login, password} = req.body
        const user = await sequelize.query(`
            select * from users where "login" = :login
            `,
        {replacements : {login : login}})
        if (!user){
            return res.json({error : "Пользователь не найден"})
        }
        let comparePassword = bcrypt.compareSync(password, user[0][0].password)
        if (!comparePassword) {
            return res.json({error : "Неправильный пароль"})
        }
        const token = generateJWT(user[0][0].id, user[0][0].login, user[0][0].roleId)
        console.log(token)
        return res.json({token})
    }
    async check(req, res) {

    }
    async showOne(req, res) {

    }
    async editUser(req, res) {

    }
    async deleteUser(req, res) {

    }


}
export const userController = new UserController()
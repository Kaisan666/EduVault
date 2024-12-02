import { json, QueryTypes } from "sequelize";
import { sequelize } from "../db.js";
import bcrypt from "bcrypt"
// const jwt = require("jsonwebtoken")
import jwt from 'jsonwebtoken';
const generateJWT = (id, login, roleName) => {
    return jwt.sign({id, login, roleName},
        process.env.SECRET_KEY,
        {expiresIn : "24h"})
}
class UserController {
    async registration(req, res) {
        const {firstName, lastName, middleName, login, password, roleId} = req.body
        const hashpass = await bcrypt.hash(password, 5);

        try{let fields = ['"firstName"', '"lastName"', '"login"', '"password"', '"roleId"'];
        let values = { firstName, lastName, login, password: hashpass, roleId };

        if (middleName) {
            fields.push('"middleName"');
            values.middleName = middleName;
        }

        const usercreation = await sequelize.query(
            `INSERT INTO users (${fields.join(', ')}, "createdAt", "updatedAt") VALUES (${Object.keys(values).map(key => `:${key}`).join(', ')}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
            { replacements: values }
        );
        const role = await sequelize.query(
            `select name from roles where id = :id`,
            {replacements : {id : roleId}}
        )

        const token = generateJWT(usercreation[0][0].id, usercreation[0][0].login, role[0][0].name);
        // return res.json(token);
        res.cookie('token', token, { httpOnly: true })
    } catch(e){
        res.status(500).json({error: e.message})
    }

    }
    async login(req, res) {
        const {login, password} = req.body
        const user = await sequelize.query(`
            select * from users where "login" = :login
            `,
        {replacements : {login : login}})
        console.log(user[0][0].id)
        if (!user){
            return res.json({error : "Пользователь не найден"})
        }
        let comparePassword = bcrypt.compareSync(password, user[0][0].password)
        if (!comparePassword) {
            return res.json({error : "Неправильный пароль"})
        }
        const role = await sequelize.query(
            `
            select "name" from users u join roles r on u."roleId" = r.id where u.id = :id
            `,
            {replacements : {id : user[0][0].id}}
        )
        const token = generateJWT(user[0][0].id, user[0][0].login, role[0][0].name)
        console.log(token)
        res.cookie('token', token, { httpOnly: true, secure: false});
        res.send({ error: null});
    }
    async check(req, res) {
        console.log(req)
        const token = generateJWT(req.user.id, req.user.login, req.user.roleId)
        return res.json({token})
    }
    async showOne(req, res) {
        const {userId} = req.params;
        try {
            const result = await sequelize.query(`
                select * from users where id = :id
                `,
            {replacements : {id : userId}})
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }

    }
    async editUser(req, res) {
        
    }
    async deleteUser(req, res) {

    }


}
export const userController = new UserController()
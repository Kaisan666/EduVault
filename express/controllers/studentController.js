import { QueryTypes } from "sequelize";
import { sequelize } from "../db.js";
import bcrypt from "bcrypt"
// const jwt = require("jsonwebtoken")
import jwt from 'jsonwebtoken';
const generateJWT = (id, login, roleId) => {
    jwt.sign({id, login, roleId},
        process.env.SECRET_KEY,
        {expiresIn : "24h"})
}
class StudentController {
    async create(req, res) {
        const {groupId} = req.params
        const {firstName, lastName, middleName, login, password} = req.body;
        const roleId = 1
        const middleNameValue = middleName ? middleName : null;

        // if (!name){
        //     return res.status(400).json({error : "номер группы обязателен"})
        // }
        console.log(password)
        const hashpass = await bcrypt.hash(password, 5)
        try{
            const usercreation = await sequelize.query(
                `INSERT INTO users ("firstName", "lastName", "middleName", "login", "password", "roleId", "createdAt", "updatedAt") 
                 VALUES (:firstName, :lastName, :middleName, :login, :password, :roleId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                  RETURNING *`, // Прямо указываем CURRENT_TIMESTAMP
                  {replacements: {firstName : firstName , lastName : lastName, middleName : middleName, login : login, password : hashpass, roleId: roleId}});
            const id = usercreation[0][0].id  
            const studentcreation = await sequelize.query(`
                
                insert into students ("userId", "groupId", "createdAt", "updatedAt") values
                 (:userId, :groupId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
                {replacements : {userId : id, groupId : groupId}})  
            const student = await sequelize.query(
                `select * from users join students on students."userId" = users."id" where users."id" = :id`
            , {replacements : {id : id}})
            const token = generateJWT(usercreation[0].id,usercreation[0].login, usercreation[0].roleId )
            // res.status(201).json(student[0])
            const i = usercreation[0].id
            console.log(i)
            return res.json({token})
        } catch(e){
            res.status(500).json({error : e.message})
        }


    }
    async showAll(req, res) {
        const {groupId} = req.params
        try {
            const result = await sequelize.query(`
                select * from students s join users u on s.userId = u.id where s.groupId = :id
                `,
            {replacements : {id : groupId}})
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }
    async showOne(req, res) {
        const {groupId} = req.params
        console.log(req.params);
        try {
            const result = await sequelize.query(
                `select * from groups where id = :id`, 
                {
                    replacements: {id : groupId},
                    type: QueryTypes.SELECT
                }
            );
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    } 
    async update(req, res) {
        const {studentId} = req.params;
        const updates = req.body;
        if (updates.length === 0){
            return res.status(400).json({error : "надо ввести хоть что то"})
        }
        try {
            // Динамическое формирование SQL-запроса
        const fields = Object.keys(updates).map(key => `"${key}" = :${key}`).join(', ');
        const replacements = { ...updates, id: studentId, updatedAt: sequelize.fn('CURRENT_TIMESTAMP') };

        const result = await sequelize.query(
            `UPDATE users AS s
             SET ${fields}, "updatedAt" = :updatedAt
             WHERE id = :id
             RETURNING *;`,
            { replacements: replacements }
        );

        res.status(200).json(result[0][0]);
        } catch (error) {
            res.status(500).json({error : error.message})
        }}
    async delete(req, res) {
        const {groupId} = req.params
        console.log(req.params);
        try {
            const result = await sequelize.query(
                'Delete from group where id = :id', 
                {
                    replacements: { id: groupId }
                }
            );
            res.status(201).json("Факультет удален")
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }


}
export const studentController = new StudentController()
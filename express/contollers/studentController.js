import { QueryTypes } from "sequelize";
import { sequelize } from "../db.js";
import bcrypt from "bcrypt"
const jwt = requre("jsonwebtoken")
class StudentController {
    async create(req, res) {
        const {groupId} = req.params
        const {firstName, lastName, middleName, login, password} = req.body;

        // if (!name){
        //     return res.status(400).json({error : "номер группы обязателен"})
        // }
        const hashpass = await bcrypt.hash(password, 5)
        try{
            const usercreation = await sequelize.query(
                `INSERT INTO users ("firstName", "lastName", "middleName", "login", "password", "createdAt", "updatedAt") 
                 VALUES (:firstName, :lastName, :middleName, :login, :password, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                  RETURNING *`, // Прямо указываем CURRENT_TIMESTAMP
                  {replacements: {firstName : firstName , lastName : lastName, middleName : middleName, login : login, password : hashpass}});
            const id = usercreation[0][0].id  
            const studentcreation = await sequelize.query(`
                
                insert into students ("course", "userId", "groupId", "createdAt", "updatedAt") values
                 (3, :userId, :groupId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
                {replacements : {userId : id, groupId : groupId}})  
            const student = await sequelize.query(
                `select * from users join students on students."userId" = users."id" where users."id" = :id`
            , {replacements : {id : id}})
            const jwt = jwt.sign()
                res.status(201).json(student[0])
            const i = usercreation[0].id
            console.log(i)
        } catch(e){
            res.status(500).json({error : e.message})
        }


    }
    async showAll(req, res) {
        const {specialtyId} = req.params
        try {
            const result = await sequelize.query(`
                select * from groups where "specialty" = :id
                `,
            {replacements : {id : specialtyId}})
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
        const {groupId} = req.params;
        const {name} = req.body;
        if (!name){
            return res.status(400).json({error : "сначала задайте нужно название направления"})
        }
        try {
            const result = await sequelize.query(
                ` UPDATE groups AS s 
                    SET "name" = :name, "updatedAt" = CURRENT_TIMESTAMP 
                    WHERE id = :id 
                    RETURNING *;`,
                    {replacements : {name : name, id : groupId}}
                )
            res.status(201).json(result[0][0])
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
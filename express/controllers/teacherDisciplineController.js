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
class TeacherSpecialtyController {
    async create(req, res) {
        const { disciplineId } = req.params;
        const {teacherId} = req.body
        console.log(req)
        
        try {
            // Проверка наличия обязательных полей
            if (!teacherId || !disciplineId) {
                return res.status(400).json({ error: "Необходимо задать все обязательные поля" });
            }
    
            const insertion = await sequelize.query(
                `INSERT INTO teacher_disciplines ("teacherId", "disciplineId", "createdAt", "updatedAt") VALUES (:teacherId, :disciplineId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
                { replacements: { teacherId, disciplineId } }
            );
    
            console.log(insertion);
            return res.json(insertion[0]);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    

    async showAll(req, res) {
        const { disciplineId } = req.params;
        try {
            // Получение идентификаторов преподавателей, связанных с факультетом
            const teachersIdResult = await sequelize.query(
                `select t."id", u."lastName", u."firstName", u."middleName" from teacher_disciplines td join teachers t on td."teacherId" = t."id" join users u on t."userId" = u."id" where td."disciplineId" = :id`,
                { replacements: { id : disciplineId } }
            );
            return res.status(201).json(teachersIdResult[0])
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async update(req, res) {
        const { specialtyId } = req.params;
        const { teacherId } = req.body;
    
        // Проверка наличия обязательных полей
        if (!teacherId) {
            return res.status(400).json({ error: "Необходимо задать все обязательные поля" });
        }
    
        try {
            const updatedAt = new Date(); // Текущая дата и время для обновления
    
            const result = await sequelize.query(
                `UPDATE teacher_faculty AS tf
                 SET "teacherId" = :teacherId, "updatedAt" = :updatedAt
                 WHERE "disciplineId" = :disciplineId
                 RETURNING *;`,
                { replacements: { teacherId, updatedAt, specialtyId } }
            );
    
            if (result[0].length === 0) {
                return res.status(404).json({ error: "Запись не найдена" });
            }
    
            res.status(200).json(result[0][0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async delete(req, res) {
        const { disciplineId, teacherId } = req.params;

        // Проверка наличия обязательных полей
        if (!disciplineId || !teacherId) {
            return res.status(400).json({ error: "Необходимо задать все обязательные поля" });
        }

        try {
            await sequelize.query(
                `DELETE FROM teacher_disciplines WHERE "disciplineId" = :disciplineId AND "teacherId" = :teacherId`,
                { replacements: { disciplineId, teacherId } }
            );

            res.status(200).json({ message: "Запись успешно удалена" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    }
export const teacherSpecialtyController = new TeacherSpecialtyController()
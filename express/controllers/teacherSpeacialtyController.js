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
        const { specialtyId } = req.params;
        const { teacherId } = req.body;
    
        try {
            // Проверка наличия обязательных полей
            if (!teacherId || !specialtyId) {
                return res.status(400).json({ error: "Необходимо задать все обязательные поля" });
            }
    
            const insertion = await sequelize.query(
                `INSERT INTO teacher_specialty ("teacherId", "specialtyId", "createdAt", "updatedAt") VALUES (:teacherId, :specialtyId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
                { replacements: { teacherId, specialtyId } }
            );
    
            console.log(insertion);
            return res.json(insertion[0]);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    

    async showAll(req, res) {
        const { specialtyId } = req.params;
        try {
            // Получение идентификаторов преподавателей, связанных с факультетом
            const teachersIdResult = await sequelize.query(
                `SELECT "teacherId" FROM teacher_specialty WHERE "specialty" = :specialty`,
                { replacements: { specialtyId } }
            );
    
            const teachersId = teachersIdResult[0].map(row => row.teacherId);
    
            // Получение информации о преподавателях
            const teachers = await sequelize.query(
                `SELECT * FROM teachers WHERE id IN (:teachersId)`,
                { replacements: { teachersId } }
            );
    
            console.log(teachersIdResult);
            console.log(teachers);
    
            return res.json(teachers[0]);
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
                 WHERE "specialtyId" = :specialtyId
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
        const { specialtyId } = req.params;
        const { teacherId } = req.body;
    
        // Проверка наличия обязательных полей
        if (!specialtyId || !teacherId) {
            return res.status(400).json({ error: "Необходимо задать все обязательные поля" });
        }
    
        try {
            await sequelize.query(
                `DELETE FROM teacher_specialty WHERE "specialtyId" = :specialtyId AND "teacherId" = :teacherId`,
                { replacements: { specialtyId, teacherId } }
            );
    
            res.status(200).json({ message: "Запись успешно удалена" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    }
export const teacherSpecialtyController = new TeacherSpecialtyController()
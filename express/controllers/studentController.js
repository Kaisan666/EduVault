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
        const { groupId } = req.params;
        const { firstName, lastName, middleName, login, password, roleId } = req.body;

        // Проверка наличия обязательных полей
        if (!firstName || !lastName || !login || !password || !roleId || !groupId) {
            return res.status(400).json({ error: "Необходимо задать все обязательные поля" });
        }

        const hashpass = await bcrypt.hash(password, 5);

        try {
            // Динамическое формирование SQL-запроса
            const fields = ['"firstName"', '"lastName"', '"login"', '"password"', '"roleId"', '"createdAt"', '"updatedAt"'];
            const values = [firstName, lastName, login, hashpass, roleId, 'CURRENT_TIMESTAMP', 'CURRENT_TIMESTAMP'];
            const replacements = { firstName, lastName, login, password: hashpass, roleId };

            if (middleName) {
                fields.splice(2, 0, '"middleName"');
                values.splice(2, 0, middleName);
                replacements.middleName = middleName;
            }

            const usercreation = await sequelize.query(
                `INSERT INTO users (${fields.join(', ')}) VALUES (${values.map((_, i) => `:${Object.keys(replacements)[i]}`).join(', ')}) RETURNING *`,
                { replacements }
            );

            const id = usercreation[0][0].id;

            const studentcreation = await sequelize.query(
                `INSERT INTO students ("userId", "groupId", "createdAt", "updatedAt") VALUES (:userId, :groupId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
                { replacements: { userId: id, groupId } }
            );

            const student = await sequelize.query(
                `SELECT * FROM users JOIN students ON students."userId" = users."id" WHERE users."id" = :id`,
                { replacements: { id } }
            );

            const token = generateJWT(usercreation[0][0].id, usercreation[0][0].login, roleId);

            return res.json({ token });
        } catch (e) {
            res.status(500).json({ error: e.message });
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
            const { studentId } = req.params;
    
            const transaction = await sequelize.transaction();
    
            try {
                // Удаление записи из таблицы students
                const studentResult = await sequelize.query(
                    'DELETE FROM students WHERE "userId" = :id RETURNING *;',
                    {
                        replacements: { id: studentId },
                        type: QueryTypes.DELETE,
                        transaction: transaction
                    }
                );
    
                if (studentResult.length === 0) {
                    await transaction.rollback();
                    return res.status(404).json({ error: "Студент не найден" });
                }
    
                // Удаление записи из таблицы users
                const userResult = await sequelize.query(
                    'DELETE FROM users WHERE "id" = :id RETURNING *;',
                    {
                        replacements: { id: studentId },
                        type: QueryTypes.DELETE,
                        transaction: transaction
                    }
                );
    
                if (userResult.length === 0) {
                    await transaction.rollback();
                    return res.status(404).json({ error: "Пользователь не найден" });
                }
    
                await transaction.commit();
                res.status(200).json({ message: "Студент и пользователь успешно удалены" });
            } catch (error) {
                await transaction.rollback();
                res.status(500).json({ error: error.message });
            }
        }
    }
export const studentController = new StudentController()
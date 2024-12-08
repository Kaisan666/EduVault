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
class TeacherController {
    async create(req, res) {
    const { firstName, lastName, middleName, login, password, roleId } = req.body;

    // Проверка наличия обязательных полей
    if (!firstName || !lastName || !login || !password || !roleId) {
        return res.status(400).json({ error: "Необходимо задать все обязательные поля" });
    }

    const hashpass = await bcrypt.hash(password, 5);

    try {
        // Динамическое формирование SQL-запроса
        let fields = ['"firstName"', '"lastName"', '"login"', '"password"', '"roleId"'];
        let values = { firstName, lastName, login, password: hashpass, roleId };

        if (middleName) {
            fields.push('"middleName"');
            values.middleName = middleName;
        }

        const usercreation = await sequelize.query(
            `INSERT INTO users (${fields.join(', ')}, "createdAt", "updatedAt") VALUES (${Object.keys(values).map(key => `:${key}`).join(', ')}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
            { replacements: values }
        );

        const id = usercreation[0][0].id;

        const teacherCreation = await sequelize.query(
            `INSERT INTO teachers ("userId", "createdAt", "updatedAt") VALUES (:userId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
            { replacements: { userId: id } }
        );

        const role = await sequelize.query(
            `select name from roles where id = :id`,
            {replacements : {id : roleId}}
        )
        console.log()

        const token = generateJWT(usercreation[0][0].id, usercreation[0][0].login, role[0][0].name);

        return res.json(usercreation[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

    async showAll(req, res) {
        try {
            const result = await sequelize.query(`
                select t."id", u."firstName", u."lastName", u."middleName" from teachers t join users u on t."userId" = u.id
                `)
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }
    async update(req, res) {
        const {teacherId} = req.params;
        const updates = req.body;
        if (updates.length === 0){
            return res.status(400).json({error : "надо ввести хоть что то"})
        }
        try {
            // Динамическое формирование SQL-запроса
        const fields = Object.keys(updates).map(key => `"${key}" = :${key}`).join(', ');
        const replacements = { ...updates, id: studentId, updatedAt: sequelize.fn('CURRENT_TIMESTAMP') };

        const result = await sequelize.query(
            `UPDATE teachers AS t
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
            const { teacherId } = req.params;
    
            const transaction = await sequelize.transaction();
    
            try {
                // Удаление записи из таблицы students
                const studentResult = await sequelize.query(
                    'DELETE FROM teachers WHERE "userId" = :id RETURNING *;',
                    {
                        replacements: { id: teacherId },
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
                        replacements: { id: teacherId },
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
export const teacherController = new TeacherController()
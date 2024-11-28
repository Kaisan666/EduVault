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

class SecretaryController {
    async create(req, res) {
        const { facultyId } = req.params;
    const { firstName, lastName, middleName, login, password, roleId } = req.body;

    // Проверка наличия обязательных полей
    if (!firstName || !lastName || !login || !password || !roleId || !facultyId) {
        return res.status(400).json({ error: "Необходимо задать все обязательные поля" });
    }

    const hashpass = await bcrypt.hash(password, 5);

    try {
        // Динамическое формирование SQL-запроса
        let fields = ['"firstName"', '"lastName"', '"login"', '"password"'];
        let values = { firstName, lastName, login, password: hashpass };

        if (middleName) {
            fields.push('"middleName"');
            values.middleName = middleName;
        }

        const usercreation = await sequelize.query(
            `INSERT INTO users (${fields.join(', ')}, "createdAt", "updatedAt") VALUES (${Object.keys(values).map(key => `:${key}`).join(', ')}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
            { replacements: values }
        );

        const id = usercreation[0][0].id;

        const studentcreation = await sequelize.query(
            `INSERT INTO secretaries ("userId", "facultyId", "createdAt", "updatedAt") VALUES (:userId, :facultyId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
            { replacements: { userId: id, facultyId } }
        );

        const student = await sequelize.query(
            `SELECT * FROM users JOIN secretaries ON secretaries."userId" = users."id" WHERE users."id" = :id`,
            { replacements: { id } }
        );

        const token = generateJWT(usercreation[0][0].id, usercreation[0][0].login, roleId);

        return res.json(usercreation[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
    async showAll(req, res) {
        const {facultyId} = req.params
        try {
            const result = await sequelize.query(`
                select * from secretaries s join users u on s."userId" = u.id where s."facultyId" = :id
                `,
            {replacements : {id : facultyId}})
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }
    async showOne(req, res) {

    }
    async update(req, res) {

    }
    async delete(req, res) {
        const { secretaryId } = req.params;
    
            const transaction = await sequelize.transaction();
    
            try {
                // Удаление записи из таблицы students
                const studentResult = await sequelize.query(
                    'DELETE FROM secretaries WHERE "userId" = :id RETURNING *;',
                    {
                        replacements: { id: secretaryId },
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
                        replacements: { id: secretaryId },
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
export const secretaryController = new SecretaryController()
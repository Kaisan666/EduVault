import { QueryTypes } from "sequelize";
import { sequelize } from "../db.js";

const d = {
    'createdAt': sequelize.literal('CURRENT_TIMESTAMP'),
    'updatedAt': sequelize.literal('CURRENT_TIMESTAMP')
}

class CourseController {

    async create(req, res) {
        const { specialtyId } = req.params;
        const { number } = req.body;

        if (!number || !specialtyId) {
            return res.status(400).json({ error: "Вы не ввели номер курса" });
        }
        try {
            const result = await sequelize.query(
                `INSERT INTO courses ("number", "specialtyId", "createdAt", "updatedAt")
                 VALUES (:number, :id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
                { replacements: { id: specialtyId, number: number } }
            );
            res.status(201).json(result[0]);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async showAll(req, res) {
        const { specialtyId } = req.params;
        try {
            const result = await sequelize.query(
                `SELECT * FROM courses WHERE "specialtyId" = :id`,
                { replacements: { id: specialtyId } }
            );
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

   
    async showOne(req, res) {
        const { courseId } = req.params;
        console.log(req.params);
        try {
            const result = await sequelize.query(
                `SELECT * FROM courses WHERE id = :id`,
                {
                    replacements: { id: courseId },
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

  
    async update(req, res) {
        const { specialtyId } = req.params;
        const { number } = req.body;
        if (!number) {
            return res.status(400).json({ error: "сначала задайте нужно название направления" });
        }
        try {
            const result = await sequelize.query(
                `UPDATE courses SET "number" = :number, "updatedAt" = CURRENT_TIMESTAMP WHERE id = :id RETURNING *;`,
                { replacements: { name: name, id: specialtyId } }
            );
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { courseId } = req.params;
        console.log(req.params);
        try {
            const result = await sequelize.query(
                'DELETE FROM courses WHERE id = :id',
                {
                    replacements: { id: courseId }
                }
            );
            res.status(200).json("Специальность удалена");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const courseController = new CourseController();

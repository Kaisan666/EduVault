import { QueryTypes } from "sequelize";
import { sequelize } from "../db.js";

class FacultyController {
    /**
     * @swagger
     * /api/faculty/create-faculty:
     *   post:
     *     summary: Create a new faculty
     *     tags: [Faculty]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *     responses:
     *       201:
     *         description: Faculty created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 createdAt:
     *                   type: string
     *                 updatedAt:
     *                   type: string
     *       400:
     *         description: Name is required
     *       500:
     *         description: Internal server error
     */
    async create(req, res) {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "название факультета обязательно" });
        }
        try {
            const result = await sequelize.query(
                `INSERT INTO faculties ("name", "createdAt", "updatedAt")
                 VALUES (:name, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
                { replacements: { name: name } }
            );
            res.status(201).json(result[0]);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    /**
     * @swagger
     * /api/faculty/all-faculties:
     *   get:
     *     summary: Get all faculties
     *     tags: [Faculty]
     *     responses:
     *       200:
     *         description: A list of faculties
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     *                   createdAt:
     *                     type: string
     *                   updatedAt:
     *                     type: string
     *       500:
     *         description: Internal server error
     */
    async showAll(req, res) {
        try {
            const result = await sequelize.query(`SELECT * FROM faculties`);
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/faculty/{facultyId}:
     *   get:
     *     summary: Get a faculty by ID
     *     tags: [Faculty]
     *     parameters:
     *       - in: path
     *         name: facultyId
     *         required: true
     *         schema:
     *           type: integer
     *         description: The faculty ID
     *     responses:
     *       200:
     *         description: A single faculty
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 createdAt:
     *                   type: string
     *                 updatedAt:
     *                   type: string
     *       404:
     *         description: Faculty not found
     *       500:
     *         description: Internal server error
     */
    async showOne(req, res) {
        const { facultyId } = req.params;
        console.log(req.params);
        try {
            const result = await sequelize.query(
                'SELECT * FROM faculties WHERE id = :id',
                {
                    replacements: { id: facultyId },
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/faculty/{facultyId}:
     *   put:
     *     summary: Update a faculty by ID
     *     tags: [Faculty]
     *     parameters:
     *       - in: path
     *         name: facultyId
     *         required: true
     *         schema:
     *           type: integer
     *         description: The faculty ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *     responses:
     *       200:
     *         description: Faculty updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 createdAt:
     *                   type: string
     *                 updatedAt:
     *                   type: string
     *       400:
     *         description: Name is required
     *       500:
     *         description: Internal server error
     */
    async update(req, res) {
        const { facultyId } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "сначала задайте нужно название факультета" });
        }
        try {
            const result = await sequelize.query(
                `UPDATE faculties SET name = :name, "updatedAt" = CURRENT_TIMESTAMP WHERE id = :id RETURNING *`,
                { replacements: { name: name, id: facultyId } }
            );
            res.status(200).json(result[0][0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/faculty/{facultyId}:
     *   delete:
     *     summary: Delete a faculty by ID
     *     tags: [Faculty]
     *     parameters:
     *       - in: path
     *         name: facultyId
     *         required: true
     *         schema:
     *           type: integer
     *         description: The faculty ID
     *     responses:
     *       200:
     *         description: Faculty deleted successfully
     *       500:
     *         description: Internal server error
     */
    async delete(req, res) {
        const { facultyId } = req.params;
        console.log(req.params);
        try {
            const result = await sequelize.query(
                'DELETE FROM faculties WHERE id = :id',
                {
                    replacements: { id: facultyId }
                }
            );
            res.status(200).json("Факультет удален");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const facultyController = new FacultyController();

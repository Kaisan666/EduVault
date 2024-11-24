import { QueryTypes } from "sequelize";
import { sequelize } from "../db.js";

const d = {
    'createdAt': sequelize.literal('CURRENT_TIMESTAMP'),
    'updatedAt': sequelize.literal('CURRENT_TIMESTAMP')
}

class CourseController {
    /**
     * @swagger
     * /api/specialty/create-specialty/{facultyId}:
     *   post:
     *     summary: Create a new specialty
     *     tags: [Specialty]
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
     *       201:
     *         description: Specialty created successfully
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
        const { facultyId } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "название специальности обязательно" });
        }
        try {
            const result = await sequelize.query(
                `INSERT INTO specialties ("name", "facultyId", "createdAt", "updatedAt")
                 VALUES (:name, :id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
                { replacements: { id: facultyId, name: name } }
            );
            res.status(201).json(result[0]);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    /**
     * @swagger
     * /api/specialty/all-specialties/{facultyId}:
     *   get:
     *     summary: Get all specialties for a faculty
     *     tags: [Specialty]
     *     parameters:
     *       - in: path
     *         name: facultyId
     *         required: true
     *         schema:
     *           type: integer
     *         description: The faculty ID
     *     responses:
     *       200:
     *         description: A list of specialties
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
        const { facultyId } = req.params;
        try {
            const result = await sequelize.query(
                `SELECT * FROM specialties WHERE "facultyId" = :id`,
                { replacements: { id: facultyId } }
            );
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/specialty/show-one/{specialtyId}:
     *   get:
     *     summary: Get a specialty by ID
     *     tags: [Specialty]
     *     parameters:
     *       - in: path
     *         name: specialtyId
     *         required: true
     *         schema:
     *           type: integer
     *         description: The specialty ID
     *     responses:
     *       200:
     *         description: A single specialty
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
     *         description: Specialty not found
     *       500:
     *         description: Internal server error
     */
    async showOne(req, res) {
        const { specialtyId } = req.params;
        console.log(req.params);
        try {
            const result = await sequelize.query(
                `SELECT * FROM specialties WHERE id = :id`,
                {
                    replacements: { id: specialtyId },
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
     * /api/specialty/update/{specialtyId}:
     *   put:
     *     summary: Update a specialty by ID
     *     tags: [Specialty]
     *     parameters:
     *       - in: path
     *         name: specialtyId
     *         required: true
     *         schema:
     *           type: integer
     *         description: The specialty ID
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
     *         description: Specialty updated successfully
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
        const { specialtyId } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "сначала задайте нужно название направления" });
        }
        try {
            const result = await sequelize.query(
                `UPDATE specialties SET "name" = :name, "updatedAt" = CURRENT_TIMESTAMP WHERE id = :id RETURNING *;`,
                { replacements: { name: name, id: specialtyId } }
            );
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/specialty/delete/{specialtyId}:
     *   delete:
     *     summary: Delete a specialty by ID
     *     tags: [Specialty]
     *     parameters:
     *       - in: path
     *         name: specialtyId
     *         required: true
     *         schema:
     *           type: integer
     *         description: The specialty ID
     *     responses:
     *       200:
     *         description: Specialty deleted successfully
     *       500:
     *         description: Internal server error
     */
    async delete(req, res) {
        const { specialtyId } = req.params;
        console.log(req.params);
        try {
            const result = await sequelize.query(
                'DELETE FROM specialties WHERE id = :id',
                {
                    replacements: { id: specialtyId }
                }
            );
            res.status(200).json("Специальность удалена");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const courseController = new CourseController();

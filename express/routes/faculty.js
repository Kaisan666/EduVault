import { Router } from "express";
import { facultyController } from "../controllers/facultyController.js";

const facultyRouter = Router();

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
facultyRouter.post("/create-faculty", facultyController.create);

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
facultyRouter.get("/all-faculties", facultyController.showAll);

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
facultyRouter.get("/:facultyId", facultyController.showOne);

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
facultyRouter.put('/:facultyId', facultyController.update);

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
facultyRouter.delete('/:facultyId', facultyController.delete);

export { facultyRouter };

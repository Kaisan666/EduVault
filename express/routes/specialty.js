import { Router } from "express";
export const specialtyRouter = Router();
import { specialtyController } from "../controllers/specialtyController.js";

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
specialtyRouter.post("/create-specialty/:facultyId", specialtyController.create);

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
specialtyRouter.get("/all-specialties/:facultyId", specialtyController.showAll);

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
specialtyRouter.get("/show-one/:specialtyId", specialtyController.showOne);

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
specialtyRouter.put('/update/:specialtyId', specialtyController.update);

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
specialtyRouter.delete('/delete/:specialtyId', specialtyController.delete);

// export { specialtyRouter };

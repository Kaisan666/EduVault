import { Router } from "express";
import { userRouter } from "./user.js";
import { facultyRouter } from "./faculty.js";
import { specialtyRouter } from "./specialty.js";
import { groupRouter } from "./group.js";
import { studentRouter } from "./student.js";

const router = Router();

/**
 * @swagger
 * /api/user:
 *   use:
 *     summary: User routes
 *     tags: [User]
 */
router.use("/user", userRouter);

/**
 * @swagger
 * /api/group:
 *   use:
 *     summary: Group routes
 *     tags: [Group]
 */
router.use("/group", groupRouter);

/**
 * @swagger
 * /api/faculty:
 *   use:
 *     summary: Faculty routes
 *     tags: [Faculty]
 */
router.use("/faculty", facultyRouter);

/**
 * @swagger
 * /api/specialty:
 *   use:
 *     summary: Specialty routes
 *     tags: [Specialty]
 */
router.use("/specialty", specialtyRouter);

/**
 * @swagger
 * /api/student:
 *   use:
 *     summary: Student routes
 *     tags: [Student]
 */
router.use("/student", studentRouter);

// router.use("/discipline",)
// router.use("/laboratory",)
// router.use("/file",)
// router.use("/department",)
// router.use("/file",)

export { router };

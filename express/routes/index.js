import { Router } from "express";
import { userRouter } from "./user.js";
import { facultyRouter } from "./faculty.js";
import { specialtyRouter } from "./specialty.js";
import { groupRouter } from "./group.js";
import { studentRouter } from "./student.js";
import { courseRouter } from "./course.js";
import { secretaryRouter } from "./secretary.js";
import { disciplineRouter } from "./discipline.js";
import { checkrole } from "../middlewares/checkRoleMiddleware.js";
import teacherRouter from "./teacher.js";
import teacherSpecialtyRouter from "./disciplineTeacher.js";
import { check } from "../middlewares/authMiddleware.js";
import { laboratoryRouter } from "./laboraty.js";
import { labFileRouter } from "./labFile.js";

const router = Router();

router.use("/file", labFileRouter)
router.use("/laboratory",check,  laboratoryRouter)
router.use("/teacher",check,  teacherRouter)
router.use("/teacher_faculty",check,  teacherSpecialtyRouter)

router.use("/secretary", check, checkrole(["Админ", "Секретарь", "Преподаватель"]),secretaryRouter)

router.use(`/discipline`,check, checkrole(["Админ", "Секретарь", "Студент", "Староста"]), disciplineRouter)

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
router.use("/group",check,  checkrole(["Админ", "Секретарь", "Преподаватель"]),groupRouter);

/**
 * @swagger
 * /api/faculty:
 *   use:
 *     summary: Faculty routes
 *     tags: [Faculty]
 */
router.use("/faculty",check,  facultyRouter);

/**
 * @swagger
 * /api/specialty:
 *   use:
 *     summary: Specialty routes
 *     tags: [Specialty]
 */
router.use("/specialty",check,  specialtyRouter);

/**
 * @swagger
 * /api/student:
 *   use:
 *     summary: Student routes
 *     tags: [Student]
 */
router.use("/student",check,  studentRouter);

router.use("/course",check,  courseRouter)

// router.use("/discipline",)
// router.use("/laboratory",)
// router.use("/file",)
// router.use("/department",)
// router.use("/file",)


export { router };

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
import teacherFacultyRouter from "./facultyTeacher.js";
const router = Router();

router.use("/teacher", teacherRouter)
router.use("/teacher_faculty", teacherFacultyRouter)

router.use("/secretary", checkrole(["Админ", "Секретарь", "Преподаватель"]),secretaryRouter)

router.use(`/discipline`,checkrole(["Админ", "Секретарь", "Студент", "Староста"]), disciplineRouter)

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
router.use("/group", checkrole(["Админ", "Секретарь", "Преподаватель"]),groupRouter);

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

router.use("/course", courseRouter)

// router.use("/discipline",)
// router.use("/laboratory",)
// router.use("/file",)
// router.use("/department",)
// router.use("/file",)


export { router };

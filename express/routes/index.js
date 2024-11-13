import { Router } from "express";
export const router = Router()
import {userRouter} from "./user.js"
import {facultyRouter} from "./faculty.js"
import { specialtyRouter } from "./specialty.js";
import { groupRouter } from "./group.js";

router.use("/user", userRouter)
router.use("/group",groupRouter)
router.use("/faculty",facultyRouter)
router.use("/specialty", specialtyRouter)
// router.use("/discipline",)
// router.use("/laboratory",)
// router.use("/file",)
// router.use("/department",)
// router.use("/file",)

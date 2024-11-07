import { Router } from "express";
export const router = Router()
import {userRouter} from "./user.js"

router.use("/user", userRouter)
// router.use("/group",)
// router.use("/specialization",)
// router.use("/faculty",)
// router.use("/discipline",)
// router.use("/laboratory",)
// router.use("/file",)
// router.use("/department",)
// router.use("/file",)

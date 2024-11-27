import { Router } from "express";
export const studentRouter = Router()
import { studentController } from "../controllers/studentController.js";


studentRouter.post("/create-student/:groupId", studentController.create)
// studentRouter.get('/auth', studentController.check)
studentRouter.get("/all-students/:groupId", studentController.showAll)
studentRouter.put('/update/:studentId', studentController.update)
studentRouter.delete('/delete/:studentId', studentController.delete)
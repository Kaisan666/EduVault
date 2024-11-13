import { Router } from "express";
export const studentRouter = Router()
import { studentController } from "../contollers/studentController.js";


studentRouter.post("/create-student/:groupId", studentController.create)
// studentRouter.post('/login', studentController.login)
// studentRouter.get('/auth', studentController.check)
// studentRouter.get("/all-students/:groupId", groupController.showOne)
// studentRouter.get("/show-one/:studentId", groupController.showAll)
// studentRouter.put('/update/:studentId', groupController.update)
// studentRouter.delete('/delete/:studentId', groupController.delete)
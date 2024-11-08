import { Router } from "express";
export const facultyRouter = Router()
import { facultyController } from "../contollers/facultyController.js";

facultyRouter.post("/create-faculty", facultyController.create)
facultyRouter.get("/all-faculties", facultyController.showAll)
facultyRouter.get("/:facultyId", facultyController.showOne)
facultyRouter.put('/:facultyId', facultyController.update)
facultyRouter.delete('/:facultyId', facultyController.delete)
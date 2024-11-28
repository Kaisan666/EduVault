import { Router } from "express";
export const disciplineRouter = Router()
import { disciplineController } from "../controllers/disciplineController.js";


disciplineRouter.post("/create-discipline/:courseId", disciplineController.create)
disciplineRouter.get("/show-all/:courseId", disciplineController.showAll)
disciplineRouter.get("/:disciplineId", disciplineController.showOne)
disciplineRouter.put('/update/:disciplineId', disciplineController.update)
disciplineRouter.delete('/delete/:disciplineId', disciplineController.delete)
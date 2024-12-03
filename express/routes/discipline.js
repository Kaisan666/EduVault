import { Router } from "express";
export const disciplineRouter = Router()
import { disciplineController } from "../controllers/disciplineController.js";
import { check } from "../middlewares/authMiddleware.js";
import { checkrole } from "../middlewares/checkRoleMiddleware.js";


disciplineRouter.post("/create-discipline/:courseId",check, checkrole(["Админ", "Староста", "Преподаватель", "Секретарь"]), disciplineController.create)
disciplineRouter.get("/show-all/:courseId",check, disciplineController.showAll)
disciplineRouter.get('/disciplines-all',check, disciplineController.showDisciplines)
disciplineRouter.get("/:disciplineId",check, checkrole(["Админ", "Староста", "Преподаватель", "Секретарь"]), disciplineController.showOne)
disciplineRouter.put('/update/:disciplineId',check, checkrole(["Админ", "Староста", "Преподаватель", "Секретарь"]), disciplineController.update)
disciplineRouter.delete('/delete/:disciplineId',check, checkrole(["Админ", "Староста", "Преподаватель", "Секретарь"]), disciplineController.delete)
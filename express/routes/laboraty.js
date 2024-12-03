import { Router } from "express";
export const laboratoryRouter = Router()
import { laboratoryController } from "../controllers/laboratoryController.js";


laboratoryRouter.post("/create-laboratory/:disciplineId", laboratoryController.create)
laboratoryRouter.get("/show-all/:disciplineId", laboratoryController.showAll)
// laboratoryRouter.get("/show-one/", groupController.showOne)
laboratoryRouter.put('/update/:laboratoryId', laboratoryController.update)
laboratoryRouter.delete('/delete/:laboratoryId', laboratoryController.delete)
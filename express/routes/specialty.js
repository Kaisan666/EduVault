import { Router } from "express";
export const specialtyRouter = Router()
import { specialtyController } from "../controllers/specialtyController.js";

specialtyRouter.post("/create-specialty/:facultyId", specialtyController.create)
specialtyRouter.get("/all-specialties/:facultyId", specialtyController.showAll)
specialtyRouter.get("/show-one/:specialtyId", specialtyController.showOne)
specialtyRouter.put('/update/:specialtyId', specialtyController.update)
specialtyRouter.delete('/delete/:specialtyId')
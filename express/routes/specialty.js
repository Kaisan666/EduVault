import { Router } from "express";
export const specialtyRouter = Router()
import { specialtyController } from "../contollers/specialtyController.js";

specialtyRouter.post("/create-specialty", specialtyController.create)
specialtyRouter.get("/all-specialties", specialtyController.showAll)
specialtyRouter.get("/:specialtyId", specialtyController.showOne)
specialtyRouter.put('/:specialtyId', specialtyController.update)
specialtyRouter.delete('/:specialtyId')
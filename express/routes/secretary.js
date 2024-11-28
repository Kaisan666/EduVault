import { Router } from "express";
import { secretaryController } from "../controllers/secretaryController.js";
export const secretaryRouter = Router()


secretaryRouter.post("/create/:facultyId", secretaryController.create)
secretaryRouter.get("/show-all/:facultyId", secretaryController.showAll)
secretaryRouter.delete("/delete/:secretaryId", secretaryController.delete)
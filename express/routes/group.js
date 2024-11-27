import { Router } from "express";
export const groupRouter = Router()
import { groupController } from "../controllers/groupController.js";


groupRouter.post("/create-group/:courseId", groupController.create)
groupRouter.get("/show-all/:courseId", groupController.showAll)
groupRouter.get("/:groupId", groupController.showOne)
groupRouter.put('/update/:groupId', groupController.update)
groupRouter.delete('/delete/:groupId', groupController.delete)
import { Router } from "express";
export const groupRouter = Router()
import { groupController } from "../controllers/groupController.js";


groupRouter.post("/create-group/:specialtyId", groupController.create)
groupRouter.get("/all-groups/:specialtyId", groupController.showOne)
groupRouter.get("/show-one/:groupId", groupController.showAll)
groupRouter.put('/update/:groupId', groupController.update)
groupRouter.delete('/delete/:groupId', groupController.delete)
import { Router } from "express";
import { courseController } from "../controllers/courseController.js";

const courseRouter = Router();

courseRouter.post("/create-course/:specialtyId", courseController.create);

courseRouter.get("/all-courses/:specialtyId", courseController.showAll);


courseRouter.get("/:courseId", courseController.showOne);

courseRouter.put('/:courseId', courseController.update);
courseRouter.delete('/:courseId', courseController.delete);

export { courseRouter };

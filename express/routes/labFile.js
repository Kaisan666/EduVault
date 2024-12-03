import { Router } from "express";
export const labFileRouter = Router();
import { labFileController } from "../controllers/fileLaboratoryController.js";
import upload from "../multerConfig.js"; // Импортируем из нового файла

labFileRouter.post("/upload-file", upload.single('file'), labFileController.create);
labFileRouter.get("/show-all/:disciplineId", labFileController.showAll);
// laboratoryRouter.get("/show-one/", groupController.showOne);
labFileRouter.put('/update/:laboratoryId', labFileController.update);
labFileRouter.delete('/delete/:fileId', labFileController.delete);
labFileRouter.get('/download-file/:fileId', labFileController.download);

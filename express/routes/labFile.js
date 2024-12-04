import { Router } from "express";
export const labFileRouter = Router();
import { labFileController } from "../controllers/fileLaboratoryController.js";
import upload from "../multerConfig.js"; // Импортируем из нового файла

labFileRouter.post("/upload-file/:laboratoryId", upload.single('file'), labFileController.create);
labFileRouter.get("/show-all/:laboratoryId", labFileController.showAll);
labFileRouter.get("/show-one/:fileId", labFileController.showOne);
labFileRouter.put('/update/:laboratoryId', labFileController.update);
labFileRouter.delete('/delete/:fileId', labFileController.delete);
labFileRouter.get('/download-file/:fileId', labFileController.download);

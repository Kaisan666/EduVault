import { Router } from 'express';
import { teacherController } from '../controllers/teacherController.js';
import { check } from '../middlewares/authMiddleware.js';
import { checkrole } from '../middlewares/checkRoleMiddleware.js';

const teacherRouter = new Router();

teacherRouter.post('/create-teacher',checkrole(["Админ", "Секретарь"]), teacherController.create);
teacherRouter.get('/show-teachers', checkrole(["Админ", "Секретарь"]), teacherController.showAll);
// router.get('/secretaries/:id', secretaryController.showOne);
teacherRouter.put('/edit-teacher/:teacherId', checkrole(["Админ", "Секретарь"]), teacherController.update);
teacherRouter.delete('/delete-teacher/:teacherId', checkrole(["Админ", "Секретарь"]), teacherController.delete);

export default teacherRouter;

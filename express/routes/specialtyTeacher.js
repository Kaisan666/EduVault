import { Router } from 'express';
import { teacherSpecialtyController } from '../controllers/teacherSpeacialtyController.js';

const teacherSpecialtyRouter = new Router();

teacherSpecialtyRouter.post('/giveTeacherFaculty', teacherSpecialtyController.create);
teacherSpecialtyRouter.get('/show-faculties_teachers/:facultyId', teacherSpecialtyController.showAll);
// router.get('/secretaries/:id', secretaryController.showOne);
teacherSpecialtyRouter.put('/edit-teacher/:teacherId', teacherSpecialtyController.update);
teacherSpecialtyRouter.delete('/delete-teacher/:teacherId', teacherSpecialtyController.delete);

export default teacherSpecialtyRouter;

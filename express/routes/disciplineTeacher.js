import { Router } from 'express';
import { teacherSpecialtyController } from '../controllers/teacherDisciplineController.js';

const teacherSpecialtyRouter = new Router();

teacherSpecialtyRouter.post('/giveTeacherDiscipline', teacherSpecialtyController.create);
teacherSpecialtyRouter.get('/show-faculties_teachers/:facultyId', teacherSpecialtyController.showAll);
// router.get('/secretaries/:id', secretaryController.showOne);
teacherSpecialtyRouter.put('/edit-teacher/:teacherId', teacherSpecialtyController.update);
teacherSpecialtyRouter.delete('/delete-teacher/:teacherId', teacherSpecialtyController.delete);

export default teacherSpecialtyRouter;

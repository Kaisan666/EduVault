import { Router } from 'express';
import { teacherSpecialtyController } from '../controllers/teacherDisciplineController.js';

const teacherSpecialtyRouter = new Router();

teacherSpecialtyRouter.post('/giveTeacherDiscipline/:disciplineId', teacherSpecialtyController.create);
teacherSpecialtyRouter.get('/getTeachersByDiscipline/:disciplineId', teacherSpecialtyController.showAll);
// router.get('/secretaries/:id', secretaryController.showOne);
teacherSpecialtyRouter.put('/edit-teacher/:teacherId', teacherSpecialtyController.update);
teacherSpecialtyRouter.delete('/removeTeacherDiscipline/:disciplineId/:teacherId', teacherSpecialtyController.delete);

export default teacherSpecialtyRouter;

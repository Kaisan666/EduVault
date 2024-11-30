import { Router } from 'express';
import { teacherFacultyController } from '../controllers/teacherFacultyController.js';

const teacherFacultyRouter = new Router();

teacherFacultyRouter.post('/giveTeacherFaculty', teacherFacultyController.create);
teacherFacultyRouter.get('/show-faculties_teachers/:facultyId', teacherFacultyController.showAll);
// router.get('/secretaries/:id', secretaryController.showOne);
teacherFacultyRouter.put('/edit-teacher/:teacherId', teacherFacultyController.update);
teacherFacultyRouter.delete('/delete-teacher/:teacherId', teacherFacultyController.delete);

export default teacherFacultyRouter;

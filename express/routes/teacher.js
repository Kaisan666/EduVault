import { Router } from 'express';
import { secretaryController } from '../controllers/secretaryController.js';

const router = new Router();

router.post('/secretaries', secretaryController.create);
router.get('/secretaries', secretaryController.showAll);
router.get('/secretaries/:id', secretaryController.showOne);
router.put('/secretaries/:id', secretaryController.update);
router.delete('/secretaries/:id', secretaryController.delete);

export default router;
